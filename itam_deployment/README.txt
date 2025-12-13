==========================================
       ITAM AGENT DEPLOYMENT GUIDE
==========================================

REQUIREMENTS:
- Python 3.8 or higher
- Internet connection

INSTALLATION:

For Windows:
1. Double-click "install.bat" to install dependencies
2. Double-click "run_agent.bat" to start the agent
   OR open Command Prompt and run: python itam_agent.py

For Mac/Linux:
1. Open Terminal in this folder
2. Run: chmod +x install.sh run_agent.sh
3. Run: ./install.sh
4. Run: ./run_agent.sh
   OR run: python3 itam_agent.py

WHAT THE AGENT DOES:
- Discovers devices on your local network
- Sends device info to ITAM dashboard
- Performs security/malware scans
- Enforces website and software blocking policies
- Runs continuously (scans every 60 seconds)

TO STOP THE AGENT:
- Press Ctrl+C in the terminal window

CONFIGURATION:
The agent connects to:
https://4d454db1-bf57-45a3-8c22-f54b8eab2982-00-3tktq9yl62ggy.riker.replit.dev

LOG FILES:
- Network discovery data: ~/network_discovery.csv
- Sent device cache: ~/.itam_agent_sent.json

TROUBLESHOOTING:
- If "pip not found": Try "pip3" instead of "pip"
- If "python not found": Try "python3" instead of "python"
- Permission errors: Run as Administrator (Windows) or with sudo (Mac/Linux)

==========================================








