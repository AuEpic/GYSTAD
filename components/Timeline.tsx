import React from 'react';

const timelineEvents = [
  { week: 24, event: 'Project Kick-off & API Integration' },
  { week: 25, event: 'UI Scaffolding & Core Views' },
  { week: 26, event: 'File System Logic & Modal Implementation' },
  { week: 27, event: 'Testing, Refinement & Deployment' },
];

const Timeline: React.FC = () => {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute top-0 left-8 w-0.5 h-full bg-slate-700"></div>
      
      <div className="space-y-8">
        {timelineEvents.map((item, index) => (
          <div key={index} className="relative flex items-center">
            {/* Circle marker */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-slate-800 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-accent-blue rounded-full"></div>
            </div>
            <div className="ml-12 bg-slate-900/50 p-4 rounded-lg w-full">
              <span className="font-mono text-sm text-accent-blue">Week {item.week}</span>
              <p className="mt-1 text-warm-white">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
