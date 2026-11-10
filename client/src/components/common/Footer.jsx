import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, GitBranch, Heart } from 'lucide-react';
import { initialProfileData } from '../../data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A0B] border-t border-[#1E292F] py-10 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Terminal Meta */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
              <span className="text-[#39FF88]">&gt;_</span>
              <span>{initialProfileData.name}</span>
              <span className="text-gray-500">//</span>
              <span className="text-[#00D9FF]">v2.4.0</span>
            </div>
            <p className="text-gray-400 text-xs font-sans">
              Full-Stack Developer | AI/ML & Generative AI Enthusiast
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 text-[11px] text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <GitBranch className="w-3 h-3 text-[#39FF88]" />
                <span>main branch</span>
              </span>
              <span>•</span>
              <span className="text-[#39FF88]">build: passing</span>
              <span>•</span>
              <span>status: 200 OK</span>
            </div>
          </div>

          {/* Social Links & Back to top */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href={initialProfileData.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded border border-[#1E292F] bg-[#0E1315] text-gray-400 hover:text-[#39FF88] hover:border-[#39FF88]/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={initialProfileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded border border-[#1E292F] bg-[#0E1315] text-gray-400 hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${initialProfileData.email}`}
                className="p-2 rounded border border-[#1E292F] bg-[#0E1315] text-gray-400 hover:text-[#39FF88] hover:border-[#39FF88]/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 rounded border border-[#1E292F] bg-[#0E1315] text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>back_to_top()</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#141B1E] flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 text-center gap-2">
          <div>
            © {new Date().getFullYear()} {initialProfileData.name}. All systems operational.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed & Engineered with modern MERN Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
