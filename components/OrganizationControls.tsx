import React from 'react';

interface OrganizationControlsProps {
    onRefresh: () => void;
}

const OrganizationControls: React.FC<OrganizationControlsProps> = ({ onRefresh }) => {
    return (
        <div className="flex justify-between items-center mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div>
                {/* Future controls can go here */}
                <p className="text-neutral-gray">Showing all detected files and projects.</p>
            </div>
            <button
                onClick={onRefresh}
                className="px-4 py-2 rounded-lg bg-slate-700 text-warm-white hover:bg-slate-600 transition-colors"
            >
                Refresh
            </button>
        </div>
    );
};

export default OrganizationControls;
