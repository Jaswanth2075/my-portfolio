import React from 'react';
import Modal from '../common/Modal';
import { Github, ExternalLink, Cpu, CheckCircle2, Layers } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${project.title} // Project Specification`}>
      <div className="space-y-6">
        {/* Project Thumbnail Image */}
        {project.thumbnail && (
          <div className="w-full h-52 sm:h-64 rounded-lg overflow-hidden border border-[#1E292F] relative group">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F10] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#0B0F10]/90 border border-[#39FF88]/40 font-mono text-xs text-[#39FF88]">
                {project.fileName || `${project.title.toLowerCase().replace(/\s+/g, '_')}.ts`}
              </span>
            </div>
          </div>
        )}

        {/* Header Info */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-mono font-bold text-white flex items-center gap-2">
            <span>{project.title}</span>
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {project.fullDescription || project.shortDescription}
          </p>
        </div>

        {/* Architecture Specs */}
        {project.architecture && (
          <div className="p-4 rounded-lg border border-[#1E292F] bg-[#0E1315] space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00D9FF]">
              <Cpu className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">System Architecture</span>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-[#39FF88] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Core Functional Highlights</span>
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technology Badges */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs text-gray-400 uppercase tracking-wider">
            Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#141B1E] border border-[#1E292F] text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-4 border-t border-[#1E292F] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold border border-[#1E292F] bg-[#141B1E] text-white hover:border-[#39FF88] hover:text-[#39FF88] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold bg-[#39FF88] text-black hover:bg-[#27D66F] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-mono text-xs border border-[#1E292F] text-gray-400 hover:text-white hover:bg-[#141B1E] transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
