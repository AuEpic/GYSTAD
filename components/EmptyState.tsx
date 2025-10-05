import React from 'react';
import { ICONS } from '../constants';

const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="text-center py-16 px-6 bg-slate-800 rounded-lg">
      {ICONS.searchOff}
      <h3 className="mt-4 text-xl font-semibold text-warm-white">No Results Found</h3>
      <p className="mt-1 text-neutral-gray">{message}</p>
    </div>
  );
};

export default EmptyState;