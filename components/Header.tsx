import React from 'react';
import type { View } from '../types';

interface HeaderProps {
  activeView: View;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, searchQuery, setSearchQuery }) => {
  return (
    <header className="flex justify-between items-center p-6 border-b border-slate-700 shrink-0">
      <h1 className="text-3xl font-bold text-warm-white">{activeView}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search files and projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded-full py-2 px-4 w-72 text-warm-white placeholder-neutral-gray focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
            aria-label="Search files and projects"
          />
        </div>
        <div className="flex items-center space-x-3">
            <img 
                src="https://picsum.photos/40" 
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-accent-blue"
            />
            <div>
                <p className="font-semibold text-warm-white">Demo User</p>
                <p className="text-sm text-neutral-gray">macOS User</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;