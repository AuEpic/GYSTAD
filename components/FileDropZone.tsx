
import React from 'react';

interface FileDropZoneProps {
  onOpenDirectory: () => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onOpenDirectory }) => {
  // The native File System Access API does not support drag-and-drop for directories in all browsers.
  // We will use a button click to trigger the directory picker for better compatibility and user experience.
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="text-center bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl p-12 max-w-2xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-neutral-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <h2 className="mt-6 text-2xl font-bold text-warm-white">Select Your Project Directory</h2>
        <p className="mt-2 text-neutral-gray">
          Choose a local directory to begin scanning, organizing, and analyzing your files and projects with AI.
        </p>
        <button
          onClick={onOpenDirectory}
          className="mt-8 px-8 py-3 rounded-lg bg-accent-blue text-white font-bold text-lg hover:bg-light-blue transition-colors shadow-lg"
        >
          Open Directory
        </button>
      </div>
    </div>
  );
};

export default FileDropZone;
