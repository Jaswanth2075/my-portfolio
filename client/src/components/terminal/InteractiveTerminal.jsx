import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { initialProfileData, skillsData, initialProjectsData } from '../../data/portfolioData';

const BANNER = `
   ____                                   __  __        _     __       
  / / /_  ______ ________      ______ _____  / /_/ /_      / /_  __(_)____  
 / / __ \\/ __  // ___/ _ \\    / __  // __ \\/ __/ __ \\   / / / / / / __  /  
/ / /_/ / /_/ /\\__ \\/ __/   / /_/ // /_/ / /_/ / / /  / / /_/ / / /_/ /   
/_/\\__,_/\\__,_//____/\\___/    \\__,_/ \\____/\\__/_/ /_/  /_/\\__,_/_/\\__,_/    
                                                                          
Type 'help' to view available commands or tap the quick chips below.
`;

const COMMANDS = ['help', 'whoami', 'about', 'skills', 'projects', 'contact', 'clear', 'sudo', 'date'];

const InteractiveTerminal = ({ isExpanded = false, onToggleExpand }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      id: 1,
      command: 'init --interactive',
      output: (
        <div className="text-gray-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
          <div className="text-[#39FF88] font-bold">{BANNER}</div>
          <div className="mt-2 text-gray-300">
            System ready. Connected to <span className="text-[#00D9FF]">jaswanth@portfolio</span> [v2.4.0]
          </div>
        </div>
      )
    }
  ]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (rawCommand) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    setCommandHistory((prev) => [rawCommand, ...prev]);
    setCommandIndex(-1);

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let outputContent;

    switch (cmd) {
      case 'help':
        outputContent = (
          <div className="space-y-1.5 font-mono text-xs text-gray-300">
            <div className="text-[#39FF88] font-semibold">Available Terminal Directives:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div><span className="text-[#00D9FF] font-bold">whoami</span> - Display developer bio & role</div>
              <div><span className="text-[#00D9FF] font-bold">about</span> - Detailed engineering journey</div>
              <div><span className="text-[#00D9FF] font-bold">skills</span> - List categorized technical arsenal</div>
              <div><span className="text-[#00D9FF] font-bold">projects</span> - View showcased repositories</div>
              <div><span className="text-[#00D9FF] font-bold">contact</span> - Reach out & transmission link</div>
              <div><span className="text-[#00D9FF] font-bold">clear</span> - Clear terminal buffer</div>
              <div><span className="text-[#00D9FF] font-bold">date</span> - Display current timestamp</div>
              <div><span className="text-[#00D9FF] font-bold">sudo</span> - Elevated privilege execution</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputContent = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p><span className="text-[#39FF88] font-bold">USER:</span> {initialProfileData.name}</p>
            <p><span className="text-[#00D9FF] font-bold">TITLE:</span> {initialProfileData.title}</p>
            <p><span className="text-gray-400 font-bold">STATUS:</span> <span className="text-[#39FF88]">{initialProfileData.status}</span></p>
            <p className="mt-2 text-gray-400">{initialProfileData.bio}</p>
          </div>
        );
        break;

      case 'about':
        outputContent = (
          <div className="space-y-2 text-xs font-mono text-gray-300">
            <div className="text-[#39FF88] font-bold">// SOFTWARE DEVELOPMENT JOURNEY</div>
            <p className="text-gray-400 leading-relaxed">{initialProfileData.journey}</p>
            <div className="text-[#00D9FF] font-bold mt-2">// CAREER OBJECTIVE</div>
            <p className="text-gray-400 leading-relaxed">{initialProfileData.careerObjectives}</p>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 inline-flex items-center text-xs text-[#39FF88] underline hover:text-white"
            >
              &gt; Scroll to About Section
            </button>
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#39FF88] font-bold">// TECHNICAL SKILL INVENTORY</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
              {skillsData.map((cat, idx) => (
                <div key={idx} className="border border-[#1E292F] p-2 rounded bg-[#0E1315]">
                  <span className="text-[#00D9FF] font-semibold">{cat.category}:</span>
                  <div className="text-gray-400 mt-1">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 inline-flex items-center text-xs text-[#39FF88] underline hover:text-white"
            >
              &gt; View Detailed Skills Matrix
            </button>
          </div>
        );
        break;

      case 'projects':
        outputContent = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#39FF88] font-bold">// PRODUCTION SHOWCASE REPOSITORIES</div>
            <div className="space-y-1.5">
              {initialProjectsData.map((p, idx) => (
                <div key={p._id} className="text-gray-300">
                  <span className="text-[#00D9FF] font-bold">[{idx + 1}] {p.title}</span> -{' '}
                  <span className="text-gray-400">{p.shortDescription}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 inline-flex items-center text-xs text-[#39FF88] underline hover:text-white"
            >
              &gt; Scroll to Interactive Projects Gallery
            </button>
          </div>
        );
        break;

      case 'contact':
        outputContent = (
          <div className="space-y-1.5 text-xs font-mono text-gray-300">
            <div className="text-[#39FF88] font-bold">// TRANSMISSION CHANNELS</div>
            <div>Email: <a href={`mailto:${initialProfileData.email}`} className="text-[#00D9FF] hover:underline">{initialProfileData.email}</a></div>
            <div>GitHub: <a href={initialProfileData.github} target="_blank" rel="noreferrer" className="text-[#00D9FF] hover:underline">{initialProfileData.github}</a></div>
            <div>LinkedIn: <a href={initialProfileData.linkedin} target="_blank" rel="noreferrer" className="text-[#00D9FF] hover:underline">{initialProfileData.linkedin}</a></div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 inline-flex items-center text-xs text-[#39FF88] underline hover:text-white"
            >
              &gt; Open Contact Form
            </button>
          </div>
        );
        break;

      case 'date':
        outputContent = (
          <div className="text-xs font-mono text-gray-300">
            System timestamp: <span className="text-[#00D9FF]">{new Date().toString()}</span>
          </div>
        );
        break;

      case 'sudo':
        outputContent = (
          <div className="text-xs font-mono text-[#FF5C5C]">
            [SECURITY ALERT] User 'guest' is not in sudoers file. This incident will be reported to Jaswanth.
          </div>
        );
        break;

      default:
        outputContent = (
          <div className="text-xs font-mono text-gray-400">
            command not found: <span className="text-[#FF5C5C] font-semibold">{rawCommand}</span>. Type <span className="text-[#39FF88] font-bold">'help'</span> for list of commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        command: rawCommand,
        output: outputContent
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && commandIndex < commandHistory.length - 1) {
        const nextIdx = commandIndex + 1;
        setCommandIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const prevIdx = commandIndex - 1;
        setCommandIndex(prevIdx);
        setInputVal(commandHistory[prevIdx]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className={`w-full rounded-xl border border-[#1E292F] bg-[#0E1315] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isExpanded ? 'h-[600px]' : 'h-[360px] sm:h-[400px]'}`}>
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0F10] border-b border-[#1E292F] select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5C5C] inline-block opacity-90"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFB84C] inline-block opacity-90"></span>
          <span className="w-3 h-3 rounded-full bg-[#39FF88] inline-block opacity-90"></span>
          <div className="flex items-center gap-1.5 ml-3 text-xs font-mono text-gray-400">
            <TerminalIcon className="w-3.5 h-3.5 text-[#39FF88]" />
            <span>jaswanth@workstation:~ (bash)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-gray-500 mr-2">
            <span className="w-2 h-2 rounded-full bg-[#39FF88] animate-ping"></span>
            <span className="text-[#39FF88]">ONLINE</span>
          </div>
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#1A2226] transition-colors"
              title={isExpanded ? 'Minimize' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Terminal Screen / Output Body */}
      <div
        className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 bg-[#0B0F10]/95"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-[#39FF88]">
              <span className="text-[#00D9FF]">jaswanth@portfolio</span>
              <span className="text-gray-500">:</span>
              <span className="text-purple-400">~</span>
              <span className="text-gray-400">$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-2 border-l border-[#1E292F] ml-1.5 my-1">
              {item.output}
            </div>
          </div>
        ))}

        {/* Current Active Input Prompt */}
        <div className="flex items-center gap-2 text-[#39FF88] pt-1">
          <span className="text-[#00D9FF]">jaswanth@portfolio</span>
          <span className="text-gray-500">:</span>
          <span className="text-purple-400">~</span>
          <span className="text-gray-400">$</span>
          <div className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm caret-[#39FF88]"
              placeholder="type a command (e.g. help, skills, projects)..."
              autoFocus
            />
          </div>
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Mobile-Friendly Command Chips Bar */}
      <div className="p-2.5 bg-[#0B0F10] border-t border-[#1E292F] flex items-center justify-between gap-2 overflow-x-auto text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-gray-500 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#39FF88]" />
          <span className="hidden sm:inline">Shortcuts:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded border border-[#1E292F] bg-[#141B1E] text-gray-400 hover:border-[#39FF88] hover:text-[#39FF88] transition-all whitespace-nowrap"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
