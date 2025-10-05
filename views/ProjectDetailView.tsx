import React from 'react';
import type { Project } from '../types';
import { ICONS } from '../constants';

interface ProjectDetailViewProps {
  project: Project;
  onAnalyze: (project: Project) => void;
  onBack: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onAnalyze, onBack }) => {
  return (
    <div className="p-8 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-neutral-gray hover:text-warm-white mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Dashboard
      </button>

      <div className="bg-slate-800 rounded-lg p-8">
        <header className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-warm-white">{project.name}</h1>
            <p className="text-neutral-gray mt-2 text-lg">{project.description}</p>
          </div>
          <span className="text-sm font-mono bg-slate-700 px-3 py-1 rounded-full shrink-0 ml-4">{project.language}</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/50 p-4 rounded-lg">
                <h3 className="text-sm text-neutral-gray">Last Commit</h3>
                <p className="text-xl font-semibold text-warm-white">{project.lastCommit}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg col-span-2">
                <div className="flex justify-between items-center text-sm text-neutral-gray mb-1">
                    <span>Progress</span>
                    <span className="font-semibold text-warm-white text-xl">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4">
                    <div
                        className="bg-success-green h-4 rounded-full"
                        style={{ width: `${project.progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
        
        <div className="mb-8">
             <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-2">Content Summary</h3>
             <p className="text-neutral-gray bg-slate-900/50 p-4 rounded-lg italic">{project.content_summary}</p>
        </div>


        <div className="flex justify-end">
             <button
                onClick={() => onAnalyze(project)}
                className="bg-accent-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-light-blue transition-colors flex items-center justify-center gap-2 text-lg"
              >
                {ICONS.sparkles}
                Analyze with AI
              </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;
