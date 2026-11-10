import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FolderGit2,
  Mail,
  User,
  LogOut,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Shield,
  Layers,
  CheckCircle,
  Eye,
  AlertCircle,
  Upload,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialProjectsData, initialProfileData } from '../../data/portfolioData';
import axiosClient from '../../api/axiosClient';

const AdminDashboard = () => {
  const { adminUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'messages' | 'profile'
  const [projects, setProjects] = useState(initialProjectsData);
  const [messages, setMessages] = useState([
    {
      _id: 'msg-01',
      name: 'Sarah Connor',
      email: 'sarah@techcorp.io',
      subject: 'Senior Full Stack / AI Role Inquiry',
      message: 'Hi Jaswanth, we loved your work on the emergency RAG chatbot and underwater image enhancement projects. We would like to discuss an engineering role with our team.',
      read: false,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'msg-02',
      name: 'Alex Rivera',
      email: 'alex@venturelabs.ai',
      subject: 'Generative AI Consulting Project',
      message: 'Hello! Are you available for a freelance contract developing a domain-specific RAG pipeline for healthcare documentation?',
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);
  const [profile, setProfile] = useState(initialProfileData);

  // Project Modal / Edit Form state
  const [editingProject, setEditingProject] = useState(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    technologies: '',
    githubLink: '',
    liveDemoLink: '',
    thumbnail: '',
    architecture: ''
  });

  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Guard: if not authenticated, redirect to /login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch live projects and messages from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, msgRes, profRes] = await Promise.allSettled([
          axiosClient.get('/projects'),
          axiosClient.get('/contact'),
          axiosClient.get('/portfolio')
        ]);

        if (projRes.status === 'fulfilled' && projRes.value?.data) {
          setProjects(projRes.value.data);
        }
        if (msgRes.status === 'fulfilled' && msgRes.value?.data) {
          setMessages(msgRes.value.data);
        }
        if (profRes.status === 'fulfilled' && profRes.value?.data) {
          setProfile(profRes.value.data);
        }
      } catch (err) {
        console.info('Backend API running in local state mode.');
      }
    };

    fetchData();
  }, []);

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  // Handle Project Form Submission (Create or Edit)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    const techArray = projectFormData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...projectFormData,
      technologies: techArray.length ? techArray : ['General'],
      fileName: `${projectFormData.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.ts`
    };

    try {
      if (editingProject) {
        // Update existing project
        try {
          await axiosClient.put(`/projects/${editingProject._id}`, payload);
        } catch (err) {
          console.warn('API sync fallback');
        }
        setProjects((prev) =>
          prev.map((p) => (p._id === editingProject._id ? { ...p, ...payload } : p))
        );
        showNotification('success', `Project "${payload.title}" updated successfully!`);
      } else {
        // Create new project
        let newProj = {
          _id: `proj-${Date.now()}`,
          ...payload,
          createdAt: new Date().toISOString()
        };
        try {
          const res = await axiosClient.post('/projects', payload);
          if (res && res.data) newProj = res.data;
        } catch (err) {
          console.warn('API sync fallback');
        }
        setProjects((prev) => [newProj, ...prev]);
        showNotification('success', `New project "${payload.title}" created successfully!`);
      }
      setIsProjectFormOpen(false);
      setEditingProject(null);
    } catch (err) {
      showNotification('error', err.message || 'Operation failed');
    }
  };

  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      technologies: 'React, Node.js, Express, MongoDB',
      githubLink: '',
      liveDemoLink: '',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      architecture: ''
    });
    setIsProjectFormOpen(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    setProjectFormData({
      title: proj.title || '',
      shortDescription: proj.shortDescription || '',
      fullDescription: proj.fullDescription || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
      githubLink: proj.githubLink || '',
      liveDemoLink: proj.liveDemoLink || '',
      thumbnail: proj.thumbnail || '',
      architecture: proj.architecture || ''
    });
    setIsProjectFormOpen(true);
  };

  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"?`)) return;

    try {
      await axiosClient.delete(`/projects/${id}`);
    } catch (err) {
      console.warn('Local delete sync');
    }
    setProjects((prev) => prev.filter((p) => p._id !== id));
    showNotification('success', `Project "${title}" deleted.`);
  };

  // Messages handling
  const handleToggleReadMessage = async (msgId) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === msgId ? { ...m, read: !m.read } : m))
    );
    try {
      const target = messages.find((m) => m._id === msgId);
      await axiosClient.patch(`/contact/${msgId}`, { read: !target?.read });
    } catch (err) {
      console.warn('Local read toggle');
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm('Delete this message permanently?')) return;
    setMessages((prev) => prev.filter((m) => m._id !== msgId));
    try {
      await axiosClient.delete(`/contact/${msgId}`);
    } catch (err) {
      console.warn('Local message delete');
    }
    showNotification('success', 'Contact message deleted.');
  };

  // Profile save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put('/portfolio', profile);
      showNotification('success', 'Portfolio bio and metadata updated successfully!');
    } catch (err) {
      showNotification('success', 'Portfolio specifications updated (local cache sync).');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F10] text-gray-200 font-mono flex flex-col">
      {/* Top Bar Header */}
      <header className="bg-[#101517] border-b border-[#1E292F] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#1E292F] bg-[#141B1E] text-xs text-gray-400 hover:text-[#39FF88] hover:border-[#39FF88]/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF88] animate-pulse"></span>
            <span className="font-bold text-white text-sm">
              Control Center <span className="text-[#39FF88]">[ADMIN]</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-2 text-gray-400">
            <Shield className="w-4 h-4 text-[#00D9FF]" />
            <span>{adminUser?.email || 'admin@jaswanthnaidu.dev'}</span>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#FF5C5C]/40 bg-[#FF5C5C]/10 text-[#FF5C5C] hover:bg-[#FF5C5C]/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Status Notification Banner */}
        {statusMessage.text && (
          <div
            className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-[#39FF88]/10 border-[#39FF88]/40 text-[#39FF88]'
                : 'bg-[#FF5C5C]/10 border-[#FF5C5C]/40 text-[#FF5C5C]'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-[#1E292F] pb-3 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'projects'
                ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#101517]'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Manage Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
              activeTab === 'messages'
                ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#101517]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages</span>
            {messages.some((m) => !m.read) && (
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] inline-block"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'profile'
                ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#101517]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Bio Settings</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Showcased Repositories</h2>
                <p className="text-xs text-gray-400 font-sans">
                  Create, modify, and delete showcase applications featured on the public portfolio.
                </p>
              </div>

              <button
                onClick={handleOpenAddProject}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#39FF88] text-black font-semibold text-xs hover:bg-[#27D66F] transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Table / Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj._id}
                  className="rounded-xl border border-[#1E292F] bg-[#101517] overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-white text-base truncate">{proj.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#141B1E] text-[#00D9FF] border border-[#1E292F]">
                        {proj.fileName || 'module.ts'}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 font-sans line-clamp-2">
                      {proj.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-[#141B1E] text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#0E1315] border-t border-[#1E292F] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-gray-500">ID: {proj._id.slice(-6)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditProject(proj)}
                        className="p-1.5 rounded text-gray-300 hover:text-[#39FF88] hover:bg-[#182126] transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj._id, proj.title)}
                        className="p-1.5 rounded text-gray-300 hover:text-[#FF5C5C] hover:bg-[#182126] transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Inbound Transmissions</h2>
              <p className="text-xs text-gray-400 font-sans">
                Review, acknowledge, and manage contact submissions submitted through the portfolio terminal.
              </p>
            </div>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-12 text-center rounded-xl border border-[#1E292F] bg-[#101517] text-gray-500 text-xs">
                  No transmissions found in inbox.
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`rounded-xl border p-5 transition-all space-y-3 ${
                      msg.read
                        ? 'border-[#1E292F] bg-[#101517]/60'
                        : 'border-[#00D9FF]/40 bg-[#101517] shadow-lg'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        {!msg.read && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#00D9FF]/20 text-[#00D9FF] font-bold">
                            NEW
                          </span>
                        )}
                        <span className="font-bold text-white">{msg.name}</span>
                        <span className="text-gray-500">&lt;{msg.email}&gt;</span>
                      </div>
                      <span className="text-[11px] text-gray-500">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-[#39FF88]">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed bg-[#0E1315] p-3 rounded-lg border border-[#1E292F]">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-end gap-3 pt-2 text-xs">
                      <button
                        onClick={() => handleToggleReadMessage(msg._id)}
                        className="text-gray-400 hover:text-[#00D9FF] transition-colors flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{msg.read ? 'Mark as Unread' : 'Mark as Read'}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="text-gray-400 hover:text-[#FF5C5C] transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="rounded-xl border border-[#1E292F] bg-[#101517] p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Portfolio Bio & Settings</h2>
              <p className="text-xs text-gray-400 font-sans">
                Update headlines, bio descriptions, and career objectives reflected across the portfolio.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400 block font-medium">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:outline-none focus:border-[#39FF88]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 block font-medium">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:outline-none focus:border-[#39FF88]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 block font-medium">Professional Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:outline-none focus:border-[#39FF88] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 block font-medium">Software Development Journey</label>
                <textarea
                  rows={3}
                  value={profile.journey}
                  onChange={(e) => setProfile({ ...profile, journey: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:outline-none focus:border-[#39FF88] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 block font-medium">Career Objectives</label>
                <textarea
                  rows={2}
                  value={profile.careerObjectives}
                  onChange={(e) => setProfile({ ...profile, careerObjectives: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:outline-none focus:border-[#39FF88] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#39FF88] text-black font-semibold hover:bg-[#27D66F] transition-all"
                >
                  Save Profile Configuration
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Project Add / Edit Modal */}
      {isProjectFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#1E292F] bg-[#101517] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 bg-[#0B0F10] border-b border-[#1E292F]">
              <span className="text-xs font-bold text-white">
                {editingProject ? 'Edit Repository Record' : 'Register New Project'}
              </span>
              <button
                onClick={() => setIsProjectFormOpen(false)}
                className="text-gray-400 hover:text-white text-xs"
              >
                [ESC]
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-gray-400 block">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectFormData.title}
                  onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                  placeholder="e.g. GoTrain or Emergency Response Bot"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:border-[#39FF88] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 block">Short Description *</label>
                <input
                  type="text"
                  required
                  value={projectFormData.shortDescription}
                  onChange={(e) => setProjectFormData({ ...projectFormData, shortDescription: e.target.value })}
                  placeholder="Concise 1-2 sentence overview"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:border-[#39FF88] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 block">Technologies (comma separated) *</label>
                <input
                  type="text"
                  required
                  value={projectFormData.technologies}
                  onChange={(e) => setProjectFormData({ ...projectFormData, technologies: e.target.value })}
                  placeholder="Java, Spring Boot, Angular, MySQL"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:border-[#39FF88] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 block">Full Architectural Description</label>
                <textarea
                  rows={3}
                  value={projectFormData.fullDescription}
                  onChange={(e) => setProjectFormData({ ...projectFormData, fullDescription: e.target.value })}
                  placeholder="Detailed technical specifications and features"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:border-[#39FF88] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400 block">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={projectFormData.githubLink}
                    onChange={(e) => setProjectFormData({ ...projectFormData, githubLink: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:border-[#39FF88] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 block">Live Demo URL</label>
                  <input
                    type="url"
                    value={projectFormData.liveDemoLink}
                    onChange={(e) => setProjectFormData({ ...projectFormData, liveDemoLink: e.target.value })}
                    placeholder="https://demo.vercel.app"
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:border-[#39FF88] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 block">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={projectFormData.thumbnail}
                  onChange={(e) => setProjectFormData({ ...projectFormData, thumbnail: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-[#1E292F] text-white focus:border-[#39FF88] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1E292F]">
                <button
                  type="button"
                  onClick={() => setIsProjectFormOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#1E292F] text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#39FF88] text-black font-semibold hover:bg-[#27D66F]"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
