#!/usr/bin/env python3

# -*- coding: utf-8 -*-

"""

ITAM / Finecons Agent



Features:

- Device discovery on local /24 (ping sweep + ARP MAC lookup)

- Host details (OS, manufacturer, serial, CPU/RAM/battery)

- Lightweight malware heuristics (suspicious processes)

- Sends SecurityNotification + per-device entries to ITAM backend

- Website blocking based on ITAM "blocked websites" policy

- Software blocking based on ITAM "prohibited software" policy:

  A) Block execution / kill running prohibited apps

  B) Block download/installer files for prohibited apps in common download folders

  C) Works alongside firewall-based website blocking (for download sites)

"""



import argparse

import subprocess

import socket

import platform

import time

import psutil

import os

import re

import csv

import sys

import json

from datetime import datetime, timedelta

from concurrent.futures import ThreadPoolExecutor, as_completed



# ========= CONFIG =========



DASHBOARD_URL   = "https://itam.galactis.ai"

POST_ENDPOINT   = "/api/pending-devices"

API_KEY         = "inexocast_dba99252a2a2354ae427dafea2e60f1a0fd8f8519f256acd43c8a7e295564637"



AUTH_HEADERS = {

    "Content-Type": "application/json",

    "X-API-Key": API_KEY

}



# Website policy endpoint

# Expected JSON:

#   { "websites": ["facebook.com", "tiktok.com"] }

#   or ["facebook.com", "tiktok.com"]

BLOCKED_WEBSITES_ENDPOINT = "/api/agent/blocked-websites"



# Prohibited software endpoint (NEW: we now consume the OBJECT format you described)

# Expected JSON:

# [

#   {

#     "id": 1,

#     "name": "BitTorrent",

#     "executableName": "bittorrent.exe",

#     "category": "File Sharing",

#     "riskLevel": "High",

#     "blockExecution": true,

#     "autoUninstall": false,

#     ...

#   },

#   ...

# ]

BLOCKED_SOFTWARE_ENDPOINT = "/api/prohibited-software"



AGENT_NAME = socket.gethostname()

POLLING_INTERVAL = 60  # seconds between scans / policy enforcement

THREADS = min(64, (os.cpu_count() or 8) * 4)

PING_TIMEOUT = 0.5



IS_WINDOWS = platform.system().lower().startswith("win")

IS_DARWIN  = platform.system().lower() == "darwin"

IS_LINUX   = platform.system().lower() == "linux"



CSV_PATH = os.path.join(os.path.expanduser("~"), "network_discovery.csv")



# Location defaults (can be overwritten if you integrate geo)

LOCATION  = "Chennai, Tamil Nadu"

LATITUDE  = "13.0827"

LONGITUDE = "80.2707"



# Root check

try:

    IS_ROOT = os.geteuid() == 0

except Exception:

    IS_ROOT = False



# ---------------- logging ----------------



def log(msg, level="INFO"):

    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [{level}] {msg}")



# ---------------- IP / network helpers ----------------



def get_local_ip():

    """Best-effort to get primary local IPv4"""

    try:

        # Prefer psutil interfaces so we avoid weird VPNs

        for iface, addrs in psutil.net_if_addrs().items():

            for a in addrs:

                if getattr(a, "family", None) == socket.AF_INET:

                    ip = a.address

                    if not ip.startswith(("127.", "169.254.")):

                        return ip

    except Exception:

        pass



    # Fallback: connect UDP to an external IP

    try:

        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

        s.connect(("8.8.8.8", 80))

        ip = s.getsockname()[0]

        s.close()

        return ip

    except Exception:

        return None



def ping(ip):

    """Return True if host responds to ping"""

    if IS_WINDOWS:

        cmd = ["ping", "-n", "1", "-w", str(int(PING_TIMEOUT * 1000)), ip]

    else:

        cmd = ["ping", "-c", "1", "-W", str(int(PING_TIMEOUT)), ip]



    try:

        rc = subprocess.run(

            cmd,

            stdout=subprocess.DEVNULL,

            stderr=subprocess.DEVNULL

        ).returncode

        return rc == 0

    except Exception:

        return False



def sweep_subnet(base_prefix):

    """

    Ping sweep a /24, e.g base_prefix = '192.168.1'

    Returns list of responsive IPs.

    """

    ips = [f"{base_prefix}.{i}" for i in range(1, 255)]



    def worker(ch):

        return [ip for ip in ch if ping(ip)]



    responsive = []

    with ThreadPoolExecutor(max_workers=THREADS) as ex:

        futures = [ex.submit(worker, ips[i:i+32]) for i in range(0, len(ips), 32)]

        for f in as_completed(futures):

            try:

                responsive.extend(f.result())

            except Exception:

                pass

    return sorted(set(responsive))



def get_mac_for_ip(ip):

    """

    Try to read ARP cache for MAC of given IP

    """

    try:

        if IS_WINDOWS:

            out = subprocess.run(["arp", "-a", ip],

                                 capture_output=True, text=True, timeout=5).stdout

            m = re.search(r'([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})', out)

            return m.group(0).replace("-", ":").lower() if m else None

        else:

            out = subprocess.run(["arp", "-n", ip],

                                 capture_output=True, text=True, timeout=5).stdout

            m = re.search(r'(([0-9a-f]{2}:){5}[0-9a-f]{2})', out, re.I)

            return m.group(1).lower() if m else None

    except Exception:

        return None



def resolve_host_name(ip):

    try:

        return socket.gethostbyaddr(ip)[0]

    except Exception:

        # fallback generic name

        return f"device-{ip.split('.')[-1]}"



# ---------------- Host / health / malware ----------------



def get_system_serial():

    if IS_WINDOWS:

        for cmd in [

            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass",

             "(Get-CimInstance Win32_BIOS).SerialNumber"],

            ["wmic", "bios", "get", "serialnumber"],

            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass",

             "(Get-CimInstance Win32_ComputerSystemProduct).IdentifyingNumber"]

        ]:

            try:

                out = subprocess.run(cmd, capture_output=True, text=True, timeout=8)

                data = (out.stdout or "").strip()

                if "serialnumber" in " ".join(cmd).lower():

                    lines = [l.strip() for l in data.splitlines() if l.strip()]

                    if len(lines) >= 2:

                        return lines[1]

                if data and not data.lower().startswith("get-ciminstance"):

                    return data

            except Exception:

                pass



    if IS_DARWIN:

        try:

            out = subprocess.run(

                r'ioreg -d2 -c IOPlatformExpertDevice | '

                r'awk -F\" \'/IOPlatformSerialNumber/ {print $4}\'',

                shell=True, capture_output=True, text=True, timeout=8

            )

            sn = (out.stdout or "").strip()

            if sn:

                return sn

        except Exception:

            pass

        try:

            out = subprocess.run(

                ["system_profiler", "SPHardwareDataType"],

                capture_output=True, text=True, timeout=12

            )

            m = re.search(r"Serial Number.*:\s*(\S+)", out.stdout or "", re.I)

            if m:

                return m.group(1).strip()

        except Exception:

            pass



    if IS_LINUX:

        paths = [

            "/sys/class/dmi/id/product_serial",

            "/sys/devices/virtual/dmi/id/product_serial",

            "/sys/class/dmi/id/board_serial",

            "/sys/class/dmi/id/product_uuid",

        ]

        for p in paths:

            try:

                if os.path.exists(p):

                    val = open(p, "r", encoding="utf-8", errors="ignore").read().strip()

                    if val and val not in ("None", "Unknown"):

                        return val

            except Exception:

                pass

        try:

            out = subprocess.run(

                ["dmidecode", "-s", "system-serial-number"],

                capture_output=True, text=True, timeout=8

            )

            sn = (out.stdout or "").strip()

            if sn and sn.lower() not in ("", "unknown", "none", "to be filled by o.e.m."):

                return sn

        except Exception:

            pass



    return None



def get_host_os():

    return f"{platform.system()} {platform.release()}"



def get_host_manufacturer():

    if IS_DARWIN:

        return "Apple"

    if IS_WINDOWS:

        try:

            out = subprocess.run(

                ["wmic", "computersystem", "get", "manufacturer"],

                capture_output=True, text=True, timeout=6

            )

            m = re.search(r'(\S+)', out.stdout.strip(), re.M)

            if m:

                return m.group(1)

        except Exception:

            pass

        return "Unknown"

    if IS_LINUX:

        try:

            out = subprocess.run(

                ["dmidecode", "-s", "system-manufacturer"],

                capture_output=True, text=True, timeout=6

            )

        except Exception:

            return "Unknown"

        s = (out.stdout or "").strip()

        return s if s and s.lower() not in ("", "unknown", "none", "to be filled by o.e.m.") else "Unknown"



def get_health_details():

    try:

        ram = psutil.virtual_memory()

        cpu = psutil.cpu_percent(interval=0.5)

        try:

            battery = psutil.sensors_battery()

        except Exception:

            battery = None

        return {

            "cpu_percent": round(float(cpu), 1) if cpu is not None else None,

            "ram_percent": round(float(ram.percent), 1) if ram is not None else None,

            "battery_percent": round(float(battery.percent), 1) if battery else None,

        }

    except Exception as e:

        log(f"Error fetching system health: {e}", "WARNING")

        return {"cpu_percent": None, "ram_percent": None, "battery_percent": None}



# lightweight malware heuristics



def _temp_paths():

    paths = []

    try:

        tmp = os.environ.get("TEMP") or os.environ.get("TMP")

        if tmp:

            paths.append(os.path.normpath(tmp).lower())

    except Exception:

        pass

    paths.append("/tmp")

    return paths



_TRUSTED_APPDATA_PREFIXES = [

    os.path.normpath(os.path.expanduser(r"~\AppData\Local\Programs\Microsoft VS Code")).lower(),

    os.path.normpath(os.path.expanduser(r"~\AppData\Local\Programs\Python")).lower(),

    os.path.normpath(os.path.expanduser(r"~\AppData\Local\Discord")).lower(),

]



def scan_local_malware():

    """

    Very simple heuristics:

    - exe running from TEMP

    - suspicious PowerShell encoded commands

    - exe in AppData but not in known trusted folders

    """

    findings = []

    temp_prefixes = _temp_paths()

    try:

        for p in psutil.process_iter(attrs=["pid", "name", "exe", "cmdline"]):

            info = p.info

            exe = (info.get("exe") or "").lower()

            if not exe:

                continue



            # 1) exe in TEMP

            for tprefix in temp_prefixes:

                if tprefix and tprefix in exe:

                    findings.append({

                        "type": "exe_in_temp",

                        "pid": info.get("pid"),

                        "name": info.get("name"),

                        "exe": info.get("exe"),

                    })

                    break



            # 2) suspicious PowerShell encoded commands

            cmdline_list = info.get("cmdline") or []

            cmd = " ".join(cmdline_list) if isinstance(cmdline_list, (list, tuple)) else str(cmdline_list)

            low = cmd.lower()

            if "encodedcommand" in low or "--enc" in low or "powershell -e" in low or "ie4uinit" in low:

                findings.append({

                    "type": "suspicious_cmdline",

                    "pid": info.get("pid"),

                    "name": info.get("name"),

                    "cmdline": cmd[:800],

                })

                continue



            # 3) exe in AppData but not in trusted prefixes

            if "appdata" in exe:

                trusted = any(tp and tp in exe for tp in _TRUSTED_APPDATA_PREFIXES)

                if not trusted:

                    findings.append({

                        "type": "exe_in_appdata_untrusted",

                        "pid": info.get("pid"),

                        "name": info.get("name"),

                        "exe": info.get("exe"),

                    })

    except Exception as e:

        log(f"Malware scan failed: {e}", "WARNING")



    # de-duplicate

    seen = set()

    unique = []

    for f in findings:

        k = (f.get("type"), str(f.get("name")), str(f.get("exe") or f.get("cmdline", "")))

        if k not in seen:

            seen.add(k)

            unique.append(f)

    return unique



# ---------------- CSV ----------------



def write_to_csv(devices_data):

    fieldnames = [

        "timestamp", "type", "name", "ipAddress", "macAddress",

        "os_name", "device_type", "manufacturer",

        "location", "latitude", "longitude",

        "serial", "cpu_percent", "battery_percent",

    ]

    timestamp = datetime.now().isoformat(timespec="seconds")

    rows = []

    seen_ips = set()

    for d in devices_data:

        if d["ipAddress"] in seen_ips:

            continue

        seen_ips.add(d["ipAddress"])

        row = dict(d)

        row["timestamp"] = timestamp

        if row["type"] == "device":

            row["serial"] = None

            row["cpu_percent"] = None

            row["battery_percent"] = None

        rows.append(row)



    file_exists = os.path.exists(CSV_PATH)

    try:

        with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:

            w = csv.DictWriter(f, fieldnames=fieldnames)

            if not file_exists or (file_exists and os.path.getsize(CSV_PATH) == 0):

                w.writeheader()

            w.writerows(rows)

        log(f"Appended {len(rows)} records to {CSV_PATH}")

    except Exception as e:

        log(f"Error writing to CSV: {e}", "ERROR")



# ---------------- Sender & cache ----------------



CACHE_PATH     = os.path.join(os.path.expanduser("~"), ".itam_agent_sent.json")

CACHE_TTL_DAYS = 30

MAX_CACHE_SIZE = 50000

_sent_cache    = {}



def _safe_parse_dt(s):

    try:

        return datetime.fromisoformat(s)

    except Exception:

        return None



def prune_cache():

    global _sent_cache

    if not _sent_cache:

        return

    cutoff = datetime.now() - timedelta(days=CACHE_TTL_DAYS)

    pruned = {

        k: v for k, v in _sent_cache.items()

        if _safe_parse_dt(v) and _safe_parse_dt(v) >= cutoff

    }

    if len(pruned) > MAX_CACHE_SIZE:

        items = sorted(pruned.items(), key=lambda kv: kv[1], reverse=True)[:MAX_CACHE_SIZE]

        pruned = dict(items)

    _sent_cache = pruned

    save_sent_cache()



def load_sent_cache():

    global _sent_cache

    try:

        if os.path.exists(CACHE_PATH):

            with open(CACHE_PATH, "r", encoding="utf-8") as f:

                _sent_cache = json.load(f)

        else:

            _sent_cache = {}

    except Exception:

        _sent_cache = {}

    prune_cache()



def save_sent_cache():

    try:

        with open(CACHE_PATH, "w", encoding="utf-8") as f:

            json.dump(_sent_cache, f)

    except Exception as e:

        log(f"Could not save cache: {e}", "WARNING")



def device_key_from_payload(payload):

    return f"nameip:{payload.get('name','')}|{payload.get('ipAddress','')}"



def already_sent(device_key):

    return device_key in _sent_cache



def mark_sent(device_key):

    _sent_cache[device_key] = datetime.now().isoformat(timespec="seconds")

    save_sent_cache()



def pprint_payload(title, payload):

    print(f"\n===== {title} =====")

    try:

        p = dict(payload)

        dd = p.get("discoveryData")

        if isinstance(dd, str):

            try:

                p["discoveryData"] = json.loads(dd)

            except Exception:

                pass

        print(json.dumps(p, indent=2, ensure_ascii=False))

    except Exception as e:

        print(f"(could not pretty-print payload: {e})")

    print("===== END =====\n")



def validate(payload):

    return [k for k in ("name", "type", "ipAddress") if not payload.get(k)]



def send_to_dashboard(payload, record_type="device"):

    """

    Generic sender. 'record_type' is just for logging.

    """

    url = f"{DASHBOARD_URL}{POST_ENDPOINT}"



    pprint_payload(f"{record_type.upper()} Payload (pre-send)", payload)



    missing = validate(payload)

    if missing:

        log(f"Payload missing required fields: {', '.join(missing)}", "ERROR")

        return False



    key = device_key_from_payload(payload)

    if record_type == "device" and already_sent(key):

        log(f"[DUPLICATE] {payload['name']} ({payload['ipAddress']}) — skipped")

        return True



    try:

        import requests

        r = requests.post(url, json=payload, headers=AUTH_HEADERS, timeout=30)

        preview = (r.text or "")[:200]

        if r.status_code in (200, 201):

            log(f"✓ SENT {payload['name']} ({payload['ipAddress']}) — HTTP {r.status_code} | {preview}")

            if record_type == "device":

                mark_sent(key)

            return True

        else:

            log(f"✗ FAILED {payload['name']} ({payload['ipAddress']}) — HTTP {r.status_code} | {preview}", "ERROR")

            return False

    except Exception as e:

        log(f"Network error while sending {payload.get('ipAddress')}: {e}", "ERROR")

        return False



# ---------------- Payload builders ----------------



def collect_host_data():

    local_ip = get_local_ip() or "127.0.0.1"

    try:

        mac = get_mac_for_ip(local_ip)

    except Exception:

        mac = None



    manufacturer = get_host_manufacturer() or "Unknown"

    os_name = get_host_os()

    device_type = "Mac" if IS_DARWIN else ("PC" if IS_WINDOWS else "Linux Machine")

    health = get_health_details()



    return {

        "name": AGENT_NAME + ".local" if IS_DARWIN and not AGENT_NAME.endswith(".local") else AGENT_NAME,

        "ipAddress": local_ip,

        "macAddress": mac,

        "os_name": os_name,

        "device_type": device_type,

        "manufacturer": manufacturer,

        "location": LOCATION,

        "latitude": LATITUDE,

        "longitude": LONGITUDE,

        "serial": get_system_serial(),

        "cpu_percent": health.get("cpu_percent"),

        "battery_percent": health.get("battery_percent"),

        "type": "host",

    }



def make_device_payload(ip_addr):

    mac = get_mac_for_ip(ip_addr)

    name = resolve_host_name(ip_addr)



    health = get_health_details()

    agent_serial = get_system_serial()



    discovery = {

        "agent_name": AGENT_NAME,

        "scan_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

        "source": "PING",

        "account": "inexocast",

        "agent_serial": agent_serial,

        "cpu_percent": health.get("cpu_percent"),

        "ram_percent": health.get("ram_percent"),

        "battery_percent": health.get("battery_percent"),

        "nmap_seen": False,

    }



    return {

        "name": name,

        "type": "Workstation",

        "model": "Unknown",

        "ipAddress": ip_addr,

        "macAddress": mac,

        "status": "Active",

        "location": LOCATION,

        "latitude": LATITUDE,

        "longitude": LONGITUDE,

        "discoveryMethod": "Agent Discovery",

        "discoveryData": json.dumps(discovery),

    }



def make_security_payload():

    local_ip = get_local_ip() or "127.0.0.1"

    mac = get_mac_for_ip(local_ip) or None

    health = get_health_details()

    agent_serial = get_system_serial()

    findings = scan_local_malware()

    status = "safe" if not findings else "infected"

    notif_name = f"{AGENT_NAME}-security-{datetime.now().strftime('%Y%m%d%H%M%S')}"



    return {

        "name": notif_name,

        "type": "Workstation",

        "model": "SecurityNotification",

        "ipAddress": local_ip,

        "macAddress": mac,

        "status": "Active",

        "location": LOCATION,

        "latitude": LATITUDE,

        "longitude": LONGITUDE,

        "discoveryMethod": "Agent Security Scan",

        "discoveryData": json.dumps({

            "agent_name": AGENT_NAME,

            "scan_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            "malware_status": status,

            "malware_findings": findings,

            "agent_serial": agent_serial,

            "cpu_percent": health.get("cpu_percent"),

            "ram_percent": health.get("ram_percent"),

            "battery_percent": health.get("battery_percent"),

        }),

    }



# ---------------- Policy fetchers & enforcement ----------------



def _normalize_policy_list(obj, key_name):

    """

    Accept:

      - list: ["x", "y"]

      - dict: { key_name: ["x", "y"] }

    and return a deduped list of lowercased strings.

    """

    if isinstance(obj, dict) and key_name in obj:

        raw = obj.get(key_name, [])

    else:

        raw = obj



    if not isinstance(raw, (list, tuple)):

        return []



    cleaned = []

    for item in raw:

        if not item:

            continue

        s = str(item).strip()

        if not s:

            continue

        cleaned.append(s.lower())

    return sorted(set(cleaned))



def fetch_blocked_websites():

    """

    Fetch blocked websites from ITAM.

    Expect JSON: list or { "websites": [...] }

    """

    url = f"{DASHBOARD_URL}{BLOCKED_WEBSITES_ENDPOINT}"

    try:

        import requests

        r = requests.get(url, headers=AUTH_HEADERS, timeout=20)

        if r.status_code != 200:

            log(f"Website policy fetch failed: HTTP {r.status_code}", "WARNING")

            return []

        data = r.json()

        sites = _normalize_policy_list(data, "websites")

        log(f"Fetched {len(sites)} blocked website(s) from ITAM")

        return sites

    except Exception as e:

        log(f"Error fetching website policy: {e}", "WARNING")

        return []



def _extract_software_policy(data):

    """

    Convert the /api/prohibited-software response into two things:



    1) tokens: list of strings used to match process names / exe paths

    2) objects: the raw prohibited software objects (dicts) for download blocking



    Handles:

      - list of dicts (preferred)

      - list of strings

      - dict with "software": [...]

    """

    tokens = set()

    objects = []



    # dict wrapper: { "software": [...] }

    if isinstance(data, dict) and "software" in data:

        data = data.get("software", [])



    if isinstance(data, list):

        for item in data:

            # Full object case (your format)

            if isinstance(item, dict):

                objects.append(item)

                name = (item.get("name") or "").strip()

                exe  = (item.get("executableName") or "").strip()



                if name:

                    tokens.add(name.lower())

                if exe:

                    exe_lower = exe.lower()

                    tokens.add(exe_lower)

                    base, _ = os.path.splitext(exe_lower)

                    if base:

                        tokens.add(base)

            else:

                # Fallback: simple string list

                s = str(item).strip().lower()

                if s:

                    tokens.add(s)

    else:

        # Anything else: try to normalize generically

        for s in _normalize_policy_list(data, "software"):

            tokens.add(s)



    return sorted(tokens), objects



def fetch_blocked_software():

    """

    Fetch prohibited software from ITAM.



    Returns:

      (tokens, objects)

        tokens  -> list[str] used for process name/path matching

        objects -> list[dict] used for download/installer blocking

    """

    url = f"{DASHBOARD_URL}{BLOCKED_SOFTWARE_ENDPOINT}"

    try:

        import requests

        r = requests.get(url, headers=AUTH_HEADERS, timeout=20)

        if r.status_code != 200:

            log(f"Software policy fetch failed: HTTP {r.status_code}", "WARNING")

            return [], []

        data = r.json()

        tokens, objects = _extract_software_policy(data)

        log(f"Fetched {len(objects)} prohibited software object(s) / {len(tokens)} token(s) from ITAM")

        return tokens, objects

    except Exception as e:

        log(f"Error fetching software policy: {e}", "WARNING")

        return [], []



def _apply_hosts_block(domains):

    """

    Fallback: block domains via hosts file.

    """

    if not domains:

        return



    if IS_WINDOWS:

        hosts_path = r"C:\Windows\System32\drivers\etc\hosts"

    else:

        hosts_path = "/etc/hosts"



    marker = "# finecons-agent-block"



    try:

        old = ""

        if os.path.exists(hosts_path):

            old = open(hosts_path, "r", encoding="utf-8", errors="ignore").read()



        lines = old.splitlines()

        # remove old agent lines

        lines = [ln for ln in lines if marker not in ln]



        with open(hosts_path, "w", encoding="utf-8") as f:

            for ln in lines:

                f.write(ln.rstrip("\n") + "\n")

            for d in domains:

                if not d:

                    continue

                f.write(f"0.0.0.0 {d} {marker}\n")

        log(f"Applied website blocking for {len(domains)} domain(s) via hosts file")

    except PermissionError:

        log("No permission to modify hosts file; website blocking skipped", "ERROR")

    except Exception as e:

        log(f"Failed to apply website blocks via hosts file: {e}", "ERROR")



def _resolve_ips_for_domains(domains):

    """

    Resolve each domain to IPv4 addresses for firewall rules.

    """

    ips = set()

    for d in domains:

        try:

            for res in socket.getaddrinfo(d, None):

                ip = res[4][0]

                # skip IPv6 for now

                if ":" in ip:

                    continue

                ips.add(ip)

        except Exception as e:

            log(f"DNS resolution failed for {d}: {e}", "WARNING")

    return sorted(ips)



def apply_website_blocks(domains):

    """

    Take website details from ITAM and make the necessary changes

    in the client's firewall (Windows). On non-Windows, fallback

    to hosts-file-based blocking.

    """

    if not domains:

        return



    domains = [d.strip().lower() for d in domains if d and d.strip()]

    if not domains:

        return



    # Windows: use Windows Firewall (netsh advfirewall)

    if IS_WINDOWS:

        ips = _resolve_ips_for_domains(domains)

        if not ips:

            log("No IPs resolved for blocked domains; skipping Windows firewall rules", "WARNING")

            return



        # Delete previous rules created by the agent

        try:

            subprocess.run(

                ["netsh", "advfirewall", "firewall", "delete", "rule", "name=FineconsAgentBlock"],

                stdout=subprocess.DEVNULL,

                stderr=subprocess.DEVNULL,

                timeout=10

            )

        except Exception:

            # best-effort; ignore

            pass



        added = 0

        for ip in ips:

            try:

                cmd = [

                    "netsh", "advfirewall", "firewall", "add", "rule",

                    "name=FineconsAgentBlock",

                    "dir=out",

                    "action=block",

                    f"remoteip={ip}",

                    "enable=yes"

                ]

                rc = subprocess.run(

                    cmd,

                    stdout=subprocess.DEVNULL,

                    stderr=subprocess.DEVNULL,

                    timeout=10

                ).returncode

                if rc == 0:

                    added += 1

                else:

                    log(f"Failed to add Windows firewall rule for {ip} (rc={rc})", "WARNING")

            except Exception as e:

                log(f"Error adding Windows firewall rule for {ip}: {e}", "WARNING")



        if added:

            log(f"Applied Windows firewall blocks for {added} IP(s) from {len(domains)} domain(s)")

        else:

            log("No Windows firewall rules were added for blocked websites", "WARNING")

        return



    # Non-Windows: fallback to hosts file (still effectively blocks HTTP/HTTPS by name)

    _apply_hosts_block(domains)



def enforce_software_blocks(blacklist_tokens):

    """

    A) Kill running processes whose name / exe path contains

       any of the banned software tokens (case-insensitive).



    blacklist_tokens -> list[str] (lowercase tokens from ITAM)

    """

    if not blacklist_tokens:

        return



    banned = [b.lower() for b in blacklist_tokens]

    killed = 0



    for proc in psutil.process_iter(attrs=["pid", "name", "exe"]):

        try:

            name = (proc.info.get("name") or "").lower()

            exe = (proc.info.get("exe") or "").lower()

            if not name and not exe:

                continue



            combo = f"{name} {exe}"

            if any(tok in combo for tok in banned):

                log(f"Terminating banned software process {name} (pid={proc.pid})")

                try:

                    proc.terminate()

                except psutil.AccessDenied:

                    log(f"Access denied killing {name} (pid={proc.pid})", "WARNING")

                except Exception as e:

                    log(f"Error killing {name} (pid={proc.pid}): {e}", "WARNING")

                killed += 1

        except (psutil.NoSuchProcess, psutil.AccessDenied):

            continue

        except Exception as e:

            log(f"Error while enumerating processes: {e}", "WARNING")



    if killed:

        log(f"Enforced software execution blocks; killed {killed} process(es)")

    else:

        log("Software execution block enforcement: no matching running processes")



# ---------- NEW: B) Download / installer blocking ----------



INSTALLER_EXTENSIONS = {".exe", ".msi", ".dmg", ".pkg", ".zip", ".rar"}



def _get_common_download_dirs():

    """

    Return a list of directories likely to contain downloaded installers.

    """

    dirs = []

    home = os.path.expanduser("~")



    candidates = [

        os.path.join(home, "Downloads"),

        os.path.join(home, "downloads"),

        os.path.join(home, "Desktop"),

        os.path.join(home, "desktop"),

    ]



    # On Windows, sometimes "Documents\\Downloads" etc

    if IS_WINDOWS:

        docs = os.path.join(home, "Documents")

        candidates.append(os.path.join(docs, "Downloads"))



    for d in candidates:

        if os.path.isdir(d):

            dirs.append(d)



    return sorted(set(dirs))



def enforce_software_download_blocks(prohibited_objects):

    """

    B) Prevent downloading/keeping installers for prohibited software.



    Strategy:

      - Look in common download folders (Downloads, Desktop, etc.)

      - For each file with installer extension (.exe, .msi, .dmg, .pkg, .zip, .rar)

      - If its filename contains any token derived from (name/executableName),

        delete the file.



    This doesn't hook the browser directly, but in practice it cleans up

    the downloaded installers and effectively "prohibits app download"

    for those prohibited software entries.

    """

    if not prohibited_objects:

        return



    # Build name tokens from software objects

    tokens = set()

    for obj in prohibited_objects:

        if not isinstance(obj, dict):

            continue

        name = (obj.get("name") or "").strip().lower()

        exe  = (obj.get("executableName") or "").strip().lower()



        if name:

            tokens.add(name)

        if exe:

            tokens.add(exe)

            base, _ = os.path.splitext(exe)

            if base:

                tokens.add(base)



    if not tokens:

        return



    download_dirs = _get_common_download_dirs()

    if not download_dirs:

        log("No download directories found for software download blocking", "INFO")

        return



    removed = 0

    checked = 0



    for d in download_dirs:

        try:

            for entry in os.scandir(d):

                if not entry.is_file():

                    continue

                fname = entry.name

                low = fname.lower()

                _, ext = os.path.splitext(low)

                if ext not in INSTALLER_EXTENSIONS:

                    continue

                checked += 1



                if any(tok in low for tok in tokens):

                    try:

                        os.remove(entry.path)

                        removed += 1

                        log(f"Deleted prohibited installer file: {entry.path}")

                    except PermissionError:

                        log(f"Permission denied deleting installer: {entry.path}", "WARNING")

                    except Exception as e:

                        log(f"Error deleting installer {entry.path}: {e}", "WARNING")

        except Exception as e:

            log(f"Error scanning download dir {d}: {e}", "WARNING")



    if removed:

        log(f"Software download blocking: removed {removed} installer file(s) (checked {checked} file(s))")

    else:

        log(f"Software download blocking: no matching installer files found (checked {checked} file(s))")



# ---------------- Discovery + send loop ----------------



def discover_and_send(deep=False):

    """

    1) Send security notification

    2) Discover devices

    3) Send device data

    4) Write CSV

    5) Apply website & software policies (A + B)

    """

    # 0) Security notification first

    try:

        sec_payload = make_security_payload()

        send_to_dashboard(sec_payload, record_type="security_notification")

    except Exception as e:

        log(f"Error sending security notification: {e}", "WARNING")



    # 1) Device discovery (simple ping sweep)

    ip = get_local_ip()

    if not ip:

        log("Could not determine local IP.", "ERROR")

        return



    subnet_prefix = ".".join(ip.split(".")[:3])  # x.y.z

    log(f"Subnet base: {subnet_prefix}.0/24 (ping sweep)")



    hosts = sweep_subnet(subnet_prefix)

    log(f"Discovered {len(hosts)} responsive device(s) via ping sweep")



    # 2) Build payloads

    host_data = collect_host_data()



    device_payloads = []

    for h in hosts:

        if h == host_data.get("ipAddress"):

            # skip the local host entry here; it's covered by security payload + host_data

            continue

        device_payloads.append(make_device_payload(h))



    # 3) CSV archival

    all_for_csv = [host_data] + [

        {

            "name": resolve_host_name(h),

            "ipAddress": h,

            "macAddress": get_mac_for_ip(h),

            "os_name": None,

            "device_type": "Unknown",

            "manufacturer": None,

            "location": LOCATION,

            "latitude": LATITUDE,

            "longitude": LONGITUDE,

            "serial": None,

            "cpu_percent": None,

            "battery_percent": None,

            "type": "device",

        }

        for h in hosts

    ]



    if all_for_csv:

        write_to_csv(all_for_csv)



    # 4) Send per-device payloads

    for payload in device_payloads:

        send_to_dashboard(payload, record_type="device")

        time.sleep(0.15)



    # 5) Policies: websites + software

    try:

        blocked_sites = fetch_blocked_websites()

        if blocked_sites:

            apply_website_blocks(blocked_sites)

    except Exception as e:

        log(f"Website blocking enforcement failed: {e}", "WARNING")



    try:

        # NEW: get both tokens and full objects

        software_tokens, software_objects = fetch_blocked_software()

        if software_tokens:

            # A) block execution

            enforce_software_blocks(software_tokens)

        if software_objects:

            # B) block download installers

            enforce_software_download_blocks(software_objects)

    except Exception as e:

        log(f"Software blocking enforcement failed: {e}", "WARNING")



# ---------------- CLI / main ----------------



def parse_args():

    ap = argparse.ArgumentParser(

        description="ITAM Agent (discovery + malware scan + policy enforcement + API sender)"

    )

    ap.add_argument(

        "--interval",

        type=int,

        default=POLLING_INTERVAL,

        help="Seconds between scans and policy enforcement",

    )

    return ap.parse_args()



def main():

    args = parse_args()

    load_sent_cache()



    print("=" * 60)

    print("ITAM Agent — Discovery + Malware Scan + Policy Enforcement + API Sender")

    print(f"Endpoint:  {DASHBOARD_URL}{POST_ENDPOINT}")

    print(f"CSV file:  {CSV_PATH}")

    print(f"Agent:     {AGENT_NAME}")

    print("=" * 60)



    while True:

        try:

            discover_and_send(deep=False)

            prune_cache()

            log(f"Scan + policy enforcement complete. Sleeping {args.interval}s…")

            time.sleep(args.interval)

        except KeyboardInterrupt:

            print("\nExiting on user request.")

            sys.exit(0)

        except Exception as e:

            log(f"Main loop exception: {e}", "ERROR")

            time.sleep(args.interval)



if __name__ == "__main__":

    main()

