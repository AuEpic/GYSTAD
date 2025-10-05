import React, { useState, useMemo, useContext } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import TasksView from './views/TasksView';
import DesignSystemView from './views/DesignSystemView';
import InteractionView from './views/InteractionView';
import ArchitectureView from './views/ArchitectureView';
import SettingsView from './views/SettingsView';
import OrganizationProgressView from './views/OrganizationProgressView';
import ProjectDetailView from './views/ProjectDetailView';
import AnalysisModal from './components/AnalysisModal';
import WavyBackground from './components/WavyBackground';
import { useFileSystem } from './hooks/useFileSystem';
import { analyzeContent } from './services/geminiService';
import type { View, AnalyzableItem, AIAnalysisResult, Project } from './types';
import { ToastProvider, ToastContext } from './contexts/ToastContext';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const { files, projects, isLoading, error, openDirectory, directoryHandle } = useFileSystem();
  const { addToast } = useContext(ToastContext);

  // Modal State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AnalyzableItem | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  
  // Detail View State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;
    return files.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [files, searchQuery]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    return projects.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [projects, searchQuery]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleDeselectProject = () => {
    setSelectedProject(null);
  };

  const handleAnalyzeRequest = (item: AnalyzableItem) => {
    setSelectedItem(item);
    setAnalysisResult(null); // Clear previous results
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setAnalysisResult(null);
  };

  const handlePerformAnalysis = async (item: AnalyzableItem, userPrompt: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeContent(item.content_summary, userPrompt);
      setAnalysisResult(result);
      addToast('Analysis complete!', 'success');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || 'An unknown error occurred.', 'error');
      handleCloseModal();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderView = () => {
    if (selectedProject) {
        return <ProjectDetailView
            project={selectedProject}
            onAnalyze={handleAnalyzeRequest}
            onBack={handleDeselectProject}
        />
    }

    switch (activeView) {
      case 'Dashboard':
        return <DashboardView 
                  files={filteredFiles} 
                  projects={filteredProjects} 
                  onAnalyze={handleAnalyzeRequest}
                  onSelectProject={handleSelectProject}
                  openDirectory={openDirectory}
                  isLoading={isLoading}
                  error={error}
                  directoryHandle={directoryHandle}
               />;
      case 'Tasks':
        return <TasksView />;
      case 'Organization':
        return <OrganizationProgressView />;
      case 'Design System':
        return <DesignSystemView />;
      case 'Interaction':
        return <InteractionView />;
      case 'Architecture':
        return <ArchitectureView />;
      case 'Settings':
        return <SettingsView />;
      default:
        return <DashboardView 
                  files={filteredFiles} 
                  projects={filteredProjects} 
                  onAnalyze={handleAnalyzeRequest}
                  onSelectProject={handleSelectProject}
                  openDirectory={openDirectory}
                  isLoading={isLoading}
                  error={error}
                  directoryHandle={directoryHandle}
                />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-gray-200 font-sans">
      <WavyBackground />
      <div className="relative flex h-full w-full z-10">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header activeView={activeView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex-1 overflow-y-auto">
            {renderView()}
          </div>
        </main>
      </div>
      <AnalysisModal
        item={selectedItem}
        isAnalyzing={isAnalyzing}
        analysisResult={analysisResult}
        onClose={handleCloseModal}
        onAnalyze={handlePerformAnalysis}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;