import React from 'react';
import type { View } from '../types';
import { ICONS } from '../constants';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors text-left ${
        isActive
          ? 'bg-accent-blue/20 text-accent-blue'
          : 'text-neutral-gray hover:bg-slate-700/50 hover:text-warm-white'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-semibold">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems: { label: View, icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: ICONS.dashboard },
    { label: 'Tasks', icon: ICONS.tasks },
    { label: 'Organization', icon: ICONS.organization },
  ];

  const docsItems: { label: View, icon: React.ReactNode }[] = [
    { label: 'Design System', icon: ICONS.design },
    { label: 'Interaction', icon: ICONS.interaction },
    { label: 'Architecture', icon: ICONS.architecture },
  ];

  return (
    <aside className="bg-slate-800/50 border-r border-slate-700 w-64 p-6 flex flex-col shrink-0">
      <div className="flex items-center gap-3 mb-10">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-warm-white">FilePal AI</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.label}>
              <NavItem
                label={item.label}
                icon={item.icon}
                isActive={activeView === item.label}
                onClick={() => setActiveView(item.label)}
              />
            </li>
          ))}
        </ul>
        <h2 className="mt-8 mb-3 text-sm font-semibold text-neutral-gray/60 uppercase tracking-wider px-4">Documentation</h2>
        <ul className="space-y-2">
          {docsItems.map(item => (
            <li key={item.label}>
              <NavItem
                label={item.label}
                icon={item.icon}
                isActive={activeView === item.label}
                onClick={() => setActiveView(item.label)}
              />
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <NavItem
          label="Settings"
          icon={ICONS.settings}
          isActive={activeView === 'Settings'}
          onClick={() => setActiveView('Settings')}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
