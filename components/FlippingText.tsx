import React from 'react';

const FlippingText: React.FC = () => {
    return (
        <div className="text-4xl font-bold text-warm-white h-[44px] overflow-hidden">
            <div className="animate-flipping">
                <span className="block">Organized</span>
                <span className="block">Improving</span>
                <span className="block">Streamlined</span>
                <span className="block">Organized</span>
            </div>
        </div>
    );
};

export default FlippingText;
