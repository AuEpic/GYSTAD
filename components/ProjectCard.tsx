
import React from 'react';
import type { Project } from '../types';
import { ICONS } from '../constants';

interface ProjectCardProps {
  project: Project;
  onAnalyze: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onAnalyze }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-5 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-blue/20">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-warm-white">{project.name}</h3>
          <span className="text-sm font-mono bg-slate-700 px-2 py-1 rounded-full">{project.language}</span>
        </div>
        <p className="text-neutral-gray text-sm mb-4 h-10">{project.description}</p>
        
        <div className="mb-2">
          <div className="flex justify-between items-center text-sm text-neutral-gray mb-1">
            <span>Progress</span>
            <span className="font-semibold text-warm-white">{project.progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div 
              className="bg-success-green h-2.5 rounded-full" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        <p className="text-xs text-neutral-gray text-right">Last commit: {project.lastCommit}</p>
      </div>

      <button
        onClick={() => onAnalyze(project)}
        className="mt-4 w-full bg-accent-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
      >
        {ICONS.sparkles}
        Analyze with AI
      </button>
    </div>
  );
};

export default ProjectCard;
