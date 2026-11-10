import React from 'react'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 text-white p-6">
      <div className="glass-card max-w-lg p-8 rounded-2xl text-center space-y-4 border border-cyan-500/20 box-glow">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          Jaswanth Naidu Portfolio
        </h1>
        <p className="text-gray-400">
          Full Stack Developer | AI/ML Enthusiast
        </p>
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
          Phase 1: Project Architecture Initialized
        </div>
      </div>
    </div>
  )
}

export default App
