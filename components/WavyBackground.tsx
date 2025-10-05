import React from 'react';

const WavyBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900">
        <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 bg-gradient-radial from-accent-blue/10 via-transparent to-transparent animate-pulse-slow"></div>
          <div 
            className="absolute inset-0 bg-wavy-pattern opacity-10 animate-pan-background"
            style={{
                backgroundSize: '200% 200%',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WavyBackground;
