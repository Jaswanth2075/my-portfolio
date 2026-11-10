import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={`Switch to ${isDark ? 'light' : 'dark'} editor theme`}
      aria-label="Toggle Theme"
      className="p-2 rounded-md border border-[#1E292F] bg-[#101517] hover:border-[#39FF88]/50 hover:text-[#39FF88] text-gray-400 transition-all duration-200 flex items-center justify-center font-mono text-xs"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#39FF88]" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
