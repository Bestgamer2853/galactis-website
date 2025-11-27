"use client";

const SALES_SHARE_FALLBACK = "https://41irce.share-na2.hsforms.com/2bHmeo6CkRbSbK86J0ReqTQ";
const PARTNER_SHARE_FALLBACK = "https://41irce.share-na2.hsforms.com/2m3ZauQ5XQBGq3OEF4HnhQQ";

export const HUBSPOT_PORTAL_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID?.trim() || "244419566";
export const HUBSPOT_SALES_FORM_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID?.trim() || "6c799ea3-a0a4-45b4-9b2b-ce89d117aa4d";
export const HUBSPOT_PARTNER_FORM_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_PARTNER_FORM_ID?.trim() || "9b765ab9-0e57-4011-aadc-e105e079e141";
export const HUBSPOT_CAREERS_FORM_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_CAREERS_FORM_ID?.trim() || "756d79d1-11ab-43b4-ac54-b85fa8451889";
export const HUBSPOT_REGION =
  process.env.NEXT_PUBLIC_HUBSPOT_REGION?.trim()?.toLowerCase() || "na2";

const HUBSPOT_EMBED_HOST =
  process.env.NEXT_PUBLIC_HUBSPOT_EMBED_HOST?.trim() || `https://js-${HUBSPOT_REGION}.hsforms.net`;

let scriptPromise: Promise<void> | null = null;

export function loadHubSpotFormsScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.hbspt?.forms?.create) {
    return Promise.resolve();
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${HUBSPOT_EMBED_HOST}/forms/embed/v2.js"]`
      );

      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("HubSpot script failed to load")));
        return;
      }

      const script = document.createElement("script");
      script.src = `${HUBSPOT_EMBED_HOST}/forms/embed/v2.js`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("HubSpot script failed to load"));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}

export function getSalesFormUrl() {
  return process.env.NEXT_PUBLIC_HUBSPOT_SALES_URL?.trim() || SALES_SHARE_FALLBACK;
}

export function getPartnerFormUrl() {
  return process.env.NEXT_PUBLIC_HUBSPOT_PARTNER_URL?.trim() || PARTNER_SHARE_FALLBACK;
}

