import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, FileDown, Code2, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import InteractiveTerminal from '../terminal/InteractiveTerminal';
import { initialProfileData } from '../../data/portfolioData';

const HeroSection = () => {
  const [typedCommand, setTypedCommand] = useState('');
  const fullCommand = 'whoami --verbose';
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showInteractiveTerminal, setShowInteractiveTerminal] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, index));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-dev-grid">
      {/* Dynamic Animated Node Background */}
      <ParticleBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        {/* Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#1E292F] bg-[#101517]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0B0F10] border-b border-[#1E292F] select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5C5C] inline-block opacity-90"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFB84C] inline-block opacity-90"></span>
              <span className="w-3 h-3 rounded-full bg-[#39FF88] inline-block opacity-90"></span>
              <span className="ml-3 font-mono text-xs text-gray-400 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-[#39FF88]" />
                <span>jaswanth@portfolio:~</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-gray-500 hidden sm:inline">
                bash 5.2.15(1)-release
              </span>
              <button
                onClick={() => setShowInteractiveTerminal(!showInteractiveTerminal)}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono border border-[#1E292F] bg-[#141B1E] text-gray-300 hover:text-[#39FF88] hover:border-[#39FF88]/40 transition-colors"
                title="Toggle interactive terminal console"
              >
                <Sparkles className="w-3 h-3 text-[#39FF88]" />
                <span>{showInteractiveTerminal ? 'Close Console' : 'Open Console'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Content Body */}
          <div className="p-6 sm:p-8 font-mono space-y-6">
            {/* Command Prompt & Typing Effect */}
            <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
              <span className="text-[#00D9FF]">jaswanth@workstation</span>
              <span className="text-gray-500">:</span>
              <span className="text-purple-400">~</span>
              <span className="text-gray-500">$</span>
              <span className="text-white font-semibold">{typedCommand}</span>
              {!isTypingDone && (
                <span className="w-2.5 h-5 bg-[#39FF88] inline-block animate-cursor-blink ml-0.5"></span>
              )}
            </div>

            {/* Terminal Output Response (Rendered once typed or on display) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTypingDone ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Name & Headline */}
              <div className="space-y-2">
                <div className="inline-block px-2.5 py-1 rounded text-xs font-mono bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/30">
                  SYSTEM STATUS: DEPLOYED & ACTIVE
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tight text-white">
                  {initialProfileData.name}
                </h1>

                <h2 className="text-lg sm:text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#39FF88] via-[#00D9FF] to-blue-400 font-semibold">
                  {initialProfileData.title}
                </h2>
              </div>

              {/* Bio & Technical Interests */}
              <p className="text-sm sm:text-base text-gray-300 font-sans max-w-3xl leading-relaxed">
                Specializing in high-performance full-stack web applications, scalable distributed
                backends, and intelligent AI/ML systems. Actively engineering with modern MERN
                stacks, Spring Boot, Retrieval-Augmented Generation (RAG), and Generative AI pipelines.
              </p>

              {/* Terminal Quick Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-gray-400">
                <div className="p-2.5 rounded-lg border border-[#1E292F] bg-[#0E1315]">
                  <span className="text-gray-500">// PRIMARY FOCUS</span>
                  <div className="text-white font-medium mt-0.5">Full Stack & AI/ML</div>
                </div>
                <div className="p-2.5 rounded-lg border border-[#1E292F] bg-[#0E1315]">
                  <span className="text-gray-500">// CORE ARCHITECTURE</span>
                  <div className="text-white font-medium mt-0.5">MERN + Spring + Python</div>
                </div>
                <div className="p-2.5 rounded-lg border border-[#1E292F] bg-[#0E1315]">
                  <span className="text-gray-500">// LOCATION</span>
                  <div className="text-white font-medium mt-0.5">{initialProfileData.location} (Remote Ready)</div>
                </div>
              </div>

              {/* CTAs and Social Links */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {/* CTA 1: View Projects */}
                <a
                  href="#projects"
                  onClick={handleScrollToProjects}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-xs sm:text-sm font-semibold bg-[#39FF88] text-black hover:bg-[#27D66F] transition-all duration-200 shadow-lg shadow-[#39FF88]/20 hover:shadow-[#39FF88]/30"
                >
                  <Code2 className="w-4 h-4" />
                  <span>View My Projects</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                {/* CTA 2: Download Resume */}
                <a
                  href={initialProfileData.resumeUrl}
                  download="Jaswanth_Naidu_Resume.pdf"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-xs sm:text-sm font-semibold border border-[#00D9FF]/50 bg-[#00D9FF]/10 text-[#00D9FF] hover:bg-[#00D9FF]/20 transition-all duration-200"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>

                {/* Social Profiles */}
                <div className="flex items-center gap-2 ml-auto">
                  <a
                    href={initialProfileData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-[#1E292F] bg-[#0E1315] text-gray-300 hover:text-[#39FF88] hover:border-[#39FF88]/40 transition-colors"
                    aria-label="GitHub Profile"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={initialProfileData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-[#1E292F] bg-[#0E1315] text-gray-300 hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-colors"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a
                    href={`mailto:${initialProfileData.email}`}
                    className="p-3 rounded-lg border border-[#1E292F] bg-[#0E1315] text-gray-300 hover:text-[#39FF88] hover:border-[#39FF88]/40 transition-colors"
                    aria-label="Email Me"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Embedded Interactive Terminal Section (Expandable) */}
        {showInteractiveTerminal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            <InteractiveTerminal onToggleExpand={() => {}} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
