import React, { useState } from 'react';
import type { View } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import TasksView from './views/TasksView';
import DesignSystemView from './views/DesignSystemView';
import InteractionView from './views/InteractionView';
import ArchitectureView from './views/ArchitectureView';
import SettingsView from './views/SettingsView';
import OrganizationProgressView from './views/OrganizationProgressView';
import { ToastProvider } from './contexts/ToastContext';
import WavyBackground from './components/WavyBackground';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView searchQuery={searchQuery} />;
      case 'Tasks':
        return <TasksView />;
      case 'Design System':
        return <DesignSystemView />;
      case 'Interaction':
        return <InteractionView />;
      case 'Architecture':
        return <ArchitectureView />;
      case 'Settings':
        return <SettingsView />;
      case 'Organization Progress':
          return <OrganizationProgressView />;
      default:
        return <DashboardView searchQuery={searchQuery} />;
    }
  };

  return (
    <ToastProvider>
      <div className="h-screen w-screen bg-slate-900 text-warm-white flex overflow-hidden relative">
        <WavyBackground />
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 flex flex-col z-10">
          <Header activeView={activeView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex-1 overflow-y-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
};

export default App;
