import React, { useState, useMemo } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import type { FileItem, Project, AnalyzableItem } from '../types';
import FileCard from '../components/FileCard';
import ProjectCard from '../components/ProjectCard';
import AnalysisModal from '../components/AnalysisModal';
import EmptyState from '../components/EmptyState';
import OrganizationControls from '../components/OrganizationControls';

interface DashboardViewProps {
    searchQuery: string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ searchQuery }) => {
  const { files, projects, isLoading, error, openDirectory, directoryHandle } = useFileSystem();
  const [selectedItem, setSelectedItem] = useState<AnalyzableItem | null>(null);

  const handleAnalyze = (item: AnalyzableItem) => {
    setSelectedItem(item);
  };

  const filteredFiles = useMemo(() => 
    files.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [files, searchQuery]
  );

  const filteredProjects = useMemo(() =>
    projects.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [projects, searchQuery]
  );

  const hasResults = filteredFiles.length > 0 || filteredProjects.length > 0;

  if (!directoryHandle && !isLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center text-center p-6">
        <div className="max-w-md">
            <h2 className="text-4xl font-bold text-warm-white mb-2">Welcome to File Harbor</h2>
            <p className="text-neutral-gray mb-6">Your intelligent local file organizer. Get started by selecting a directory to analyze.</p>
            <button
              onClick={openDirectory}
              className="px-8 py-3 rounded-lg bg-accent-blue text-white font-bold text-lg hover:bg-blue-500 transition-colors shadow-lg shadow-accent-blue/20"
            >
              Open Directory
            </button>
            {error && <p className="mt-4 text-error-red">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-error-red">{error}</p>}

      {directoryHandle && (
        <>
            <OrganizationControls onRefresh={openDirectory} />
            
            {filteredProjects.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-warm-white">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProjects.map((project: Project) => (
                        <ProjectCard key={project.id} project={project} onAnalyze={handleAnalyze} />
                        ))}
                    </div>
                </section>
            )}

            {filteredFiles.length > 0 && (
                 <section>
                    <h2 className="text-2xl font-semibold mb-4 text-warm-white">Files</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredFiles.map((file: FileItem) => (
                        <FileCard key={file.id} file={file} onAnalyze={handleAnalyze} />
                        ))}
                    </div>
                </section>
            )}

            {!isLoading && !hasResults && searchQuery && (
                <EmptyState message={`No files or projects found for "${searchQuery}". Try another search.`} />
            )}

            {selectedItem && (
                <AnalysisModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </>
      )}
    </div>
  );
};

export default DashboardView;
