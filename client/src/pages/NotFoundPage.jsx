import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center p-4 font-mono text-center">
      <div className="max-w-md p-8 rounded-2xl border border-[#1E292F] bg-[#101517] space-y-4 shadow-2xl">
        <div className="w-12 h-12 rounded-xl bg-[#141B1E] border border-[#FF5C5C]/40 text-[#FF5C5C] flex items-center justify-center mx-auto">
          <Terminal className="w-6 h-6" />
        </div>
        <div className="text-3xl font-bold text-white">404: Not Found</div>
        <p className="text-xs text-gray-400 font-sans">
          The requested route or filesystem node does not exist in this environment.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#39FF88] text-black font-semibold text-xs hover:bg-[#27D66F] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
