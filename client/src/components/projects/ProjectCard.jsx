import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, Eye, FileCode2 } from 'lucide-react';

const ProjectCard = ({ project, index, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl border border-[#1E292F] bg-[#101517] overflow-hidden flex flex-col justify-between group hover:border-[#39FF88]/40 transition-all duration-300 shadow-xl"
    >
      <div>
        {/* Editor File Tab Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0F10] border-b border-[#1E292F] select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C5C]/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB84C]/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF88]/80 inline-block"></span>
            <span className="ml-2 font-mono text-xs text-gray-300 flex items-center gap-1.5 group-hover:text-[#39FF88] transition-colors">
              <FileCode2 className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span className="truncate max-w-[180px] sm:max-w-[220px]">
                {project.fileName || `${project.title.toLowerCase().replace(/\s+/g, '_')}.ts`}
              </span>
            </span>
          </div>

          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
            MOD {index + 1}
          </span>
        </div>

        {/* Thumbnail Image Container */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-[#0A0D0E] border-b border-[#1E292F]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101517] via-transparent to-transparent opacity-90" />

          {/* Quick Overlay Action on Image */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => onViewDetails(project)}
              className="px-2.5 py-1 rounded bg-[#0B0F10]/90 border border-[#1E292F] text-gray-300 hover:text-[#39FF88] hover:border-[#39FF88]/40 font-mono text-xs flex items-center gap-1 backdrop-blur-sm transition-all shadow-sm"
              title="View full project specifications"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-3">
          <h3 className="font-mono text-lg font-bold text-white group-hover:text-[#39FF88] transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#141B1E] text-gray-300 border border-[#1E292F]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#141B1E] text-[#00D9FF]">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer with Links */}
      <div className="p-4 bg-[#0E1315] border-t border-[#1E292F] flex items-center justify-between">
        <button
          onClick={() => onViewDetails(project)}
          className="text-xs font-mono text-[#39FF88] hover:underline flex items-center gap-1 font-medium"
        >
          <span>View Details</span>
          <span className="text-[10px]">&gt;&gt;</span>
        </button>

        <div className="flex items-center gap-2">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#1A2226] transition-colors"
              title="GitHub Repository"
              aria-label={`GitHub for ${project.title}`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded text-gray-400 hover:text-[#00D9FF] hover:bg-[#1A2226] transition-colors"
              title="Live Demo"
              aria-label={`Live Demo for ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
