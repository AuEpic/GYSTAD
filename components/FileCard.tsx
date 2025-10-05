import React from 'react';
import type { FileItem } from '../types';
import { FileType } from '../types';
import { ICONS } from '../constants';

interface FileCardProps {
  file: FileItem;
  onAnalyze: (file: FileItem) => void;
}

// Fix: Replaced JSX.Element with React.ReactElement to resolve namespace error.
const getIconForFileType = (type: FileType): React.ReactElement => {
  switch (type) {
    case FileType.Code: return ICONS.code;
    case FileType.Document: return ICONS.document;
    case FileType.Image: return ICONS.image;
    case FileType.Backup: return ICONS.backup;
    default: return ICONS.unknown;
  }
};

const FileCard: React.FC<FileCardProps> = ({ file, onAnalyze }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-blue/20">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-accent-blue">
            {getIconForFileType(file.type)}
            <span className="font-semibold">{file.type}</span>
          </div>
          <span className="text-sm font-mono bg-slate-700 px-2 py-1 rounded">{file.size}</span>
        </div>
        <h3 className="font-bold text-warm-white truncate">{file.name}</h3>
        <p className="text-xs text-neutral-gray mt-1">Modified: {file.lastModified}</p>
      </div>
      <button 
        onClick={() => onAnalyze(file)}
        className="mt-4 w-full bg-accent-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
      >
        {ICONS.sparkles}
        Analyze with AI
      </button>
    </div>
  );
};

export default FileCard;
