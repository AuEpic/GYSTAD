import React from 'react';
import { ARCHITECTURE_DIAGRAM } from '../constants';

const ArchitectureView: React.FC = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-warm-white">System Architecture</h2>
            <div className="bg-slate-800 p-4 rounded-lg">
                <pre className="text-sm text-neutral-gray font-mono whitespace-pre-wrap">{ARCHITECTURE_DIAGRAM}</pre>
            </div>
        </div>
    );
};

export default ArchitectureView;