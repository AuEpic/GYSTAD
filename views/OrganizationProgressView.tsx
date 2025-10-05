import React from 'react';
import Timeline from '../components/Timeline';
import FlippingText from '../components/FlippingText';

const OrganizationProgressView: React.FC = () => {
    const events = [
        { date: 'Week 1', title: 'Project Scanned', description: 'Initial directory scan completed. Identified 12 projects and 158 files.'},
        { date: 'Week 1', title: 'First Analysis', description: 'Analyzed "Project Phoenix" and applied suggestions for categorization.'},
        { date: 'Week 2', title: 'Batch Tagging', description: 'Tagged all design assets based on AI analysis, improving searchability.'},
        { date: 'Week 3', title: 'Archive Suggestions', description: 'Identified 4 legacy projects suitable for archiving. Action pending.'},
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-warm-white">Organization Journey</h2>
            <p className="text-neutral-gray mb-8">Track your progress as you organize your local development environment with AI assistance.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800 p-6 rounded-lg text-center">
                    <p className="text-neutral-gray text-sm">Files Analyzed</p>
                    <p className="text-4xl font-bold text-accent-blue">73</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg text-center">
                    <p className="text-neutral-gray text-sm">Actions Applied</p>
                    <p className="text-4xl font-bold text-success-green">42</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg text-center">
                     <p className="text-neutral-gray text-sm">Current Status</p>
                     <FlippingText />
                </div>
            </div>

            <Timeline events={events} />
        </div>
    );
};

export default OrganizationProgressView;
