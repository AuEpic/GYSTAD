import React from 'react';
import { DESIGN_SYSTEM_COLORS } from '../constants';

const DesignSystemView: React.FC = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-warm-white">Visual Design System</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {DESIGN_SYSTEM_COLORS.map(color => (
                    <div key={color.name} className="bg-slate-800 p-4 rounded-lg">
                        <div className="w-full h-24 rounded" style={{backgroundColor: color.hex}}></div>
                        <h3 className="mt-3 font-bold text-lg">{color.name}</h3>
                        <p className="text-sm text-neutral-gray">{color.role}</p>
                        <p className="text-xs font-mono mt-1">{color.hex}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesignSystemView;