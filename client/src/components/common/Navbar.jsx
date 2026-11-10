import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Terminal, Shield, FileText, Code2, Layers, Send, UserCheck, ExternalLink } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { label: 'about.md', href: '#about', icon: UserCheck },
  { label: 'skills.json', href: '#skills', icon: Code2 },
  { label: 'projects.tsx', href: '#projects', icon: Layers },
  { label: 'experience.yml', href: '#experience', icon: FileText },
  { label: 'contact.sh', href: '#contact', icon: Send },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-mono ${
        scrolled
          ? 'bg-[#0B0F10]/90 backdrop-blur-md border-b border-[#1E292F] py-2.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Terminal Prompt */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#141B1E] border border-[#1E292F] flex items-center justify-center group-hover:border-[#39FF88] transition-colors">
            <span className="text-[#39FF88] font-bold text-sm">&gt;_</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm tracking-wide group-hover:text-[#39FF88] transition-colors">
                jaswanth<span className="text-[#00D9FF]">.dev</span>
              </span>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-ping inline-block"></span>
                <span>online</span>
              </span>
            </div>
            <div className="text-[10px] text-gray-500 hidden sm:block">
              // full-stack & ai/ml
            </div>
          </div>
        </a>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#101517] p-1.5 rounded-lg border border-[#1E292F]">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-[#182126] text-[#39FF88] font-semibold border border-[#39FF88]/40 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-[#141B1E]'
                }`}
              >
                <item.icon className="w-3.5 h-3.5 opacity-80" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Theme + Admin + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          <ThemeToggle />

          {/* Admin link */}
          <button
            onClick={() => navigate(isAuthenticated ? '/admin' : '/login')}
            className={`p-2 rounded-md border text-xs font-mono transition-all flex items-center justify-center ${
              isAuthenticated
                ? 'border-[#39FF88]/50 bg-[#39FF88]/10 text-[#39FF88]'
                : 'border-[#1E292F] bg-[#101517] text-gray-400 hover:text-[#39FF88] hover:border-[#39FF88]/40'
            }`}
            title={isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
            aria-label="Admin Portal"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md border border-[#1E292F] bg-[#101517] text-gray-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#39FF88]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0E1315] border-b border-[#1E292F] px-4 pt-3 pb-5 space-y-2">
          <div className="text-[11px] text-gray-500 font-mono px-2">// EXPLORER</div>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-gray-300 hover:bg-[#141B1E] hover:text-[#39FF88] border border-transparent hover:border-[#1E292F]"
            >
              <item.icon className="w-4 h-4 text-[#00D9FF]" />
              <span>{item.label}</span>
            </a>
          ))}
          <div className="pt-2 border-t border-[#1E292F] flex justify-between items-center text-xs text-gray-400">
            <span>Terminal mode: Active</span>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate(isAuthenticated ? '/admin' : '/login');
              }}
              className="text-[#39FF88] hover:underline"
            >
              {isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
