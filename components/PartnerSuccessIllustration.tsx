"use client";

export default function PartnerSuccessIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-emerald-900/20 backdrop-blur-sm">
      <svg
        viewBox="0 0 600 400"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient overlay */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Gradient for shapes */}
          <linearGradient id="purpleGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Gradient for people */}
          <linearGradient id="peopleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        
        {/* Background */}
        <rect width="600" height="400" fill="url(#bgGradient)" />
        
        {/* Abstract tech/AI background elements */}
        {/* Floating circles representing data points */}
        <circle cx="80" cy="60" r="25" fill="url(#purpleGreen)" opacity="0.4">
          <animate attributeName="r" values="25;30;25" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="520" cy="80" r="20" fill="url(#purpleGreen)" opacity="0.3">
          <animate attributeName="r" values="20;25;20" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="550" cy="340" r="30" fill="url(#purpleGreen)" opacity="0.35">
          <animate attributeName="r" values="30;35;30" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="350" r="18" fill="url(#purpleGreen)" opacity="0.3">
          <animate attributeName="r" values="18;23;18" dur="4.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Connected nodes representing network/AI */}
        <g opacity="0.2">
          <line x1="100" y1="100" x2="180" y2="120" stroke="url(#purpleGreen)" strokeWidth="2" />
          <line x1="180" y1="120" x2="220" y2="180" stroke="url(#purpleGreen)" strokeWidth="2" />
          <line x1="480" y1="140" x2="520" y2="180" stroke="url(#purpleGreen)" strokeWidth="2" />
          <line x1="520" y1="180" x2="480" y2="220" stroke="url(#purpleGreen)" strokeWidth="2" />
          <circle cx="100" cy="100" r="4" fill="#8B5CF6" />
          <circle cx="180" cy="120" r="4" fill="#6366F1" />
          <circle cx="220" cy="180" r="4" fill="#10B981" />
          <circle cx="480" cy="140" r="4" fill="#8B5CF6" />
          <circle cx="520" cy="180" r="4" fill="#6366F1" />
          <circle cx="480" cy="220" r="4" fill="#10B981" />
        </g>
        
        {/* Abstract shapes - representing AI/Tech themes */}
        <g opacity="0.15">
          <path d="M450 50 L500 70 L480 120 L430 100 Z" fill="url(#purpleGreen)" />
          <path d="M120 300 L160 280 L180 330 L140 350 Z" fill="url(#purpleGreen)" />
          <polygon points="350,70 370,90 360,130 340,110" fill="url(#purpleGreen)" />
        </g>
        
        {/* Main scene: Businesspeople shaking hands */}
        {/* Person 1 (left) */}
        <g transform="translate(180, 150)">
          {/* Head */}
          <circle cx="0" cy="0" r="28" fill="url(#peopleGradient)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
          {/* Body - suit */}
          <rect x="-18" y="28" width="36" height="60" rx="18" fill="url(#peopleGradient)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
          {/* Arms */}
          <ellipse cx="-22" cy="45" rx="8" ry="20" fill="url(#peopleGradient)" transform="rotate(-20 -22 45)" />
          {/* Handshake arm extended */}
          <ellipse cx="25" cy="50" rx="10" ry="22" fill="url(#peopleGradient)" transform="rotate(25 25 50)" />
          {/* Legs */}
          <rect x="-12" y="88" width="10" height="35" rx="5" fill="url(#peopleGradient)" />
          <rect x="2" y="88" width="10" height="35" rx="5" fill="url(#peopleGradient)" />
        </g>
        
        {/* Person 2 (right) */}
        <g transform="translate(420, 150)">
          {/* Head */}
          <circle cx="0" cy="0" r="28" fill="url(#peopleGradient)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
          {/* Body - suit */}
          <rect x="-18" y="28" width="36" height="60" rx="18" fill="url(#peopleGradient)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
          {/* Arms */}
          <ellipse cx="22" cy="45" rx="8" ry="20" fill="url(#peopleGradient)" transform="rotate(20 22 45)" />
          {/* Handshake arm extended */}
          <ellipse cx="-25" cy="50" rx="10" ry="22" fill="url(#peopleGradient)" transform="rotate(-25 -25 50)" />
          {/* Legs */}
          <rect x="-12" y="88" width="10" height="35" rx="5" fill="url(#peopleGradient)" />
          <rect x="2" y="88" width="10" height="35" rx="5" fill="url(#peopleGradient)" />
        </g>
        
        {/* Shaking hands - center */}
        <g transform="translate(300, 200)">
          {/* Hands meeting */}
          <circle cx="0" cy="0" r="18" fill="url(#peopleGradient)" stroke="rgba(99, 102, 241, 0.5)" strokeWidth="3">
            <animate attributeName="r" values="18;20;18" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Success sparkles around hands */}
          <g opacity="0.6">
            <circle cx="-25" cy="-15" r="3" fill="#8B5CF6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="25" cy="-15" r="3" fill="#10B981">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="-20" cy="20" r="2.5" fill="#6366F1">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="20" cy="20" r="2.5" fill="#10B981">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.2s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        
        {/* Growth chart icon - bottom left */}
        <g transform="translate(100, 280)" opacity="0.25">
          <path d="M0 40 L10 30 L20 35 L30 20 L40 25 L50 10 L50 40 Z" fill="url(#purpleGreen)" />
          <line x1="0" y1="40" x2="50" y2="40" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        </g>
        
        {/* AI/Neural network visualization - top right */}
        <g transform="translate(450, 80)" opacity="0.25">
          <circle cx="0" cy="0" r="8" fill="#8B5CF6" />
          <circle cx="25" cy="-10" r="6" fill="#6366F1" />
          <circle cx="30" cy="15" r="7" fill="#10B981" />
          <circle cx="-15" cy="20" r="6" fill="#6366F1" />
          <line x1="0" y1="0" x2="25" y2="-10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <line x1="25" y1="-10" x2="30" y2="15" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <line x1="30" y1="15" x2="-15" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <line x1="-15" y1="20" x2="0" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        </g>
        
        {/* Success badges/icons - floating around */}
        <g opacity="0.3">
          {/* Checkmark badge */}
          <g transform="translate(140, 90)">
            <circle cx="0" cy="0" r="12" fill="#10B981" opacity="0.6" />
            <path d="M-5 -2 L-2 2 L5 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
          
          {/* Star badge */}
          <g transform="translate(460, 280)">
            <path d="M0,-12 L3,3 L12,3 L4,9 L7,21 L0,15 L-7,21 L-4,9 L-12,3 L-3,3 Z" 
                  fill="#8B5CF6" opacity="0.6" />
          </g>
        </g>
        
        {/* Subtle overlay for depth */}
        <rect width="600" height="400" fill="url(#bgGradient)" opacity="0.3" />
      </svg>
    </div>
  );
}

