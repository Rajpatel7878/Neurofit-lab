import React from 'react';

interface BrainLogoProps {
  className?: string;
  animated?: boolean;
}

export function BrainLogo({ className = '', animated = true }: BrainLogoProps) {
  return (
    <svg
      className={`h-8 w-8 ${animated ? 'animate-pulse' : ''} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Brain waves/neural network paths */}
      <g filter="url(#glow)" stroke="#00AEEF" strokeWidth="2" fill="none" strokeLinecap="round">
        {/* Left hemisphere waves */}
        <path d="M 20 50 Q 25 40 30 50 T 40 50" />
        <path d="M 20 60 Q 25 55 30 60 T 40 60" />
        <path d="M 15 55 Q 20 50 25 55 T 35 55" />

        {/* Center connections */}
        <path d="M 40 45 L 60 45" />
        <path d="M 40 55 L 60 55" />
        <path d="M 40 50 L 60 50" />

        {/* Right hemisphere waves */}
        <path d="M 60 50 Q 65 40 70 50 T 80 50" />
        <path d="M 60 60 Q 65 55 70 60 T 80 60" />
        <path d="M 65 55 Q 70 50 75 55 T 85 55" />
      </g>

      {/* Center circle with accent */}
      <circle cx="50" cy="50" r="8" fill="#00D4AA" filter="url(#glow)" opacity="0.8" />
      <circle cx="50" cy="50" r="5" fill="#00AEEF" />
    </svg>
  );
}
