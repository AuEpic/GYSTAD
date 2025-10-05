import React from 'react';
import { INTERACTION_PRINCIPLES } from '../constants';

const InteractionView: React.FC = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-warm-white">Core Interaction Principles</h2>
            <div className="space-y-6">
                {INTERACTION_PRINCIPLES.map(principle => (
                    <div key={principle.title} className="bg-slate-800 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-accent-blue">{principle.title}</h3>
                        <p className="mt-2 text-neutral-gray leading-relaxed">{principle.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InteractionView;