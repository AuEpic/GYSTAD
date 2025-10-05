import React from 'react';
import Timeline from '../components/Timeline';
import FlippingText from '../components/FlippingText';

const OrganizationProgressView: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2 text-warm-white">Organization Progress</h2>
      <p className="text-neutral-gray mb-8">This view will track organizational tasks and progress over time.</p>

      <div className="bg-slate-800 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold text-warm-white mb-4">Feature Status</h3>
        <FlippingText />
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-warm-white mb-6">Development Timeline</h3>
        <Timeline />
      </div>
    </div>
  );
};

export default OrganizationProgressView;
