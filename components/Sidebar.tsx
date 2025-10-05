import React from 'react';
import type { View } from '../types';
import { ICONS } from '../constants';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactElement;
  label: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors text-lg ${
      isActive
        ? 'bg-accent-blue/20 text-warm-white font-semibold'
        : 'text-neutral-gray hover:bg-slate-700/50 hover:text-warm-white'
    }`}
  >
    <span className="mr-4">{icon}</span>
    {label}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems: { label: View, icon: React.ReactElement }[] = [
    { label: 'Dashboard', icon: ICONS.dashboard },
    { label: 'Tasks', icon: ICONS.tasks },
    { label: 'Organization Progress', icon: ICONS.progress },
  ];

  const docsItems: { label: View, icon: React.ReactElement }[] = [
    { label: 'Design System', icon: ICONS.design },
    { label: 'Interaction', icon: ICONS.interaction },
    { label: 'Architecture', icon: ICONS.architecture },
  ]

  return (
    <aside className="w-72 bg-slate-900/70 p-6 flex flex-col shrink-0 border-r border-slate-700">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-accent-blue rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-warm-white">File Harbor</h1>
      </div>
      
      <nav className="flex-grow">
        <h2 className="text-sm font-semibold text-neutral-gray uppercase tracking-wider px-4 mb-2">Main</h2>
        <div className="space-y-2">
            {navItems.map(item => (
                <NavItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeView === item.label}
                    onClick={() => setActiveView(item.label)}
                />
            ))}
        </div>
        <h2 className="text-sm font-semibold text-neutral-gray uppercase tracking-wider px-4 mt-8 mb-2">Docs</h2>
        <div className="space-y-2">
            {docsItems.map(item => (
                <NavItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeView === item.label}
                    onClick={() => setActiveView(item.label)}
                />
            ))}
        </div>
      </nav>

      <div className="mt-auto">
        <NavItem
            icon={ICONS.settings}
            label="Settings"
            isActive={activeView === 'Settings'}
            onClick={() => setActiveView('Settings')}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
