
import React from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-[44px] z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-orange-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            GTA ROOF <span className="text-orange-500">GUARD</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'listing', label: 'Add Listing' },
            { id: 'contact', label: 'Contact' },
            { id: 'admin', label: 'Admin' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                currentPage === item.id ? 'text-orange-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-orange-700 transition-all shadow-md active:scale-95"
        >
          Emergency Chat
        </button>
      </div>
    </nav>
  );
};
