import React from 'react';

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
}

interface TimelineProps {
    events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
    return (
        <div className="relative border-l-2 border-slate-700 ml-4 pl-8 py-4">
            {events.map((event, index) => (
                <div key={index} className="mb-8 last:mb-0">
                    <div className="absolute -left-[11px] top-1.5 w-5 h-5 bg-accent-blue rounded-full border-4 border-slate-900"></div>
                    <p className="text-sm text-neutral-gray">{event.date}</p>
                    <h3 className="text-lg font-bold text-warm-white mt-1">{event.title}</h3>
                    <p className="text-neutral-gray mt-1">{event.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
