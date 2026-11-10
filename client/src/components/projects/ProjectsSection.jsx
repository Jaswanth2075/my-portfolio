import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { initialProjectsData } from '../../data/portfolioData';
import axiosClient from '../../api/axiosClient';
import { Terminal, RefreshCw, FolderGit2 } from 'lucide-react';

const ProjectsSection = () => {
  const [projects, setProjects] = useState(initialProjectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/projects');
        if (res && res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err) {
        // Fallback to initial projects if server is not yet seeded
        console.info('Using local showcase projects (API fallback mode active)');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'AI/ML') {
      return p.technologies.some((t) =>
        ['Python', 'NLP', 'RAG', 'LLM', 'Machine Learning', 'Computer Vision'].includes(t)
      );
    }
    if (filter === 'FULLSTACK') {
      return p.technologies.some((t) =>
        ['Java', 'Spring Boot', 'Angular', 'React', 'Node.js', 'MySQL', 'MongoDB'].includes(t)
      );
    }
    return true;
  });

  return (
    <section id="projects" className="py-20 relative bg-[#0B0F10] border-t border-[#1E292F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="03. repositories"
          title="Featured Projects"
          description="// engineered applications spanning full-stack architectures, generative ai, and computer vision"
        />

        {/* Filter Controls / Editor Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-10 pb-4 border-b border-[#1E292F]">
          <div className="flex items-center gap-1.5 bg-[#101517] p-1 rounded-lg border border-[#1E292F] font-mono text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded transition-all ${
                filter === 'ALL'
                  ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              all ({projects.length})
            </button>
            <button
              onClick={() => setFilter('FULLSTACK')}
              className={`px-3 py-1.5 rounded transition-all ${
                filter === 'FULLSTACK'
                  ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              full-stack
            </button>
            <button
              onClick={() => setFilter('AI/ML')}
              className={`px-3 py-1.5 rounded transition-all ${
                filter === 'AI/ML'
                  ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ai / ml & rag
            </button>
          </div>

          <div className="font-mono text-xs text-gray-500 flex items-center gap-2">
            <FolderGit2 className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>git branch: main</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id || index}
              project={project}
              index={index}
              onViewDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Modal Inspector */}
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
