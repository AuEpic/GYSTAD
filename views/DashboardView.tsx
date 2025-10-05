import React from 'react';
import type { FileItem, Project } from '../types';
import FileCard from '../components/FileCard';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../components/EmptyState';
import FileDropZone from '../components/FileDropZone';

interface DashboardViewProps {
  files: FileItem[];
  projects: Project[];
  onAnalyze: (item: FileItem | Project) => void;
  onSelectProject: (project: Project) => void;
  openDirectory: () => void;
  isLoading: boolean;
  error: string | null;
  directoryHandle: FileSystemDirectoryHandle | null;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  files,
  projects,
  onAnalyze,
  onSelectProject,
  openDirectory,
  isLoading,
  error,
  directoryHandle
}) => {
  const hasContent = files.length > 0 || projects.length > 0;
  const hasSearched = (files.length + projects.length) === 0 && directoryHandle;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-neutral-gray">Scanning directory...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center bg-error-red/20 p-8 rounded-lg">
          <h3 className="text-xl font-bold text-error-red">An Error Occurred</h3>
          <p className="mt-2 text-neutral-gray">{error}</p>
          <button onClick={openDirectory} className="mt-4 px-4 py-2 rounded-lg bg-accent-blue text-white font-bold hover:bg-light-blue">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!directoryHandle) {
    return <FileDropZone onOpenDirectory={openDirectory} />;
  }

  return (
    <div className="p-6">
        {hasSearched && (
            <div className="mb-6">
                <EmptyState message="Your search did not match any files or projects in the selected directory." />
            </div>
        )}

        {projects.length > 0 && (
            <>
                <h2 className="text-2xl font-semibold mb-4 text-warm-white">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {projects.map(project => 
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onAnalyze={onAnalyze}
                            onClick={() => onSelectProject(project)} 
                        />
                    )}
                </div>
            </>
        )}

        {files.length > 0 && (
            <>
                <h2 className="text-2xl font-semibold mb-4 text-warm-white">Files</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {files.map(file => <FileCard key={file.id} file={file} onAnalyze={onAnalyze} />)}
                </div>
            </>
        )}
    </div>
  );
};

export default DashboardView;