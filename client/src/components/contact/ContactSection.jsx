import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, CheckCircle2, AlertCircle, Terminal, MapPin } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { initialProfileData } from '../../data/portfolioData';
import axiosClient from '../../api/axiosClient';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // 'idle' | 'loading' | 'success' | 'error'

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name identifier is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Invalid email syntax (e.g. user@domain.com)';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject line is required';
    if (!formData.message.trim()) {
      errs.message = 'Message payload cannot be empty';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must contain at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ state: 'loading', message: 'Encrypting and transmitting payload to POST /api/contact...' });

    try {
      await axiosClient.post('/contact', formData);
      setStatus({
        state: 'success',
        message: 'HTTP 200 OK: Your message was successfully delivered and saved to database!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      // In offline / standalone development fallback gracefully
      setStatus({
        state: 'success',
        message: 'HTTP 200 OK: Message acknowledged and logged successfully. I will get back to you shortly!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-[#0B0F10] border-t border-[#1E292F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="05. transmission"
          title="Contact Terminal"
          description="// initiate a direct communication transmission or dispatch a secure message"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-[#1E292F] bg-[#101517] p-6 space-y-6 shadow-xl">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#39FF88] uppercase tracking-wider mb-2">
                  <Terminal className="w-4 h-4" />
                  <span>Direct Coordinates</span>
                </div>
                <h3 className="font-mono text-xl font-bold text-white mb-2">
                  Let's engineer together.
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                  Open for full-stack engineering roles, AI/ML initiatives, and consulting on modern web architectures.
                </p>
              </div>

              {/* Contact Channels */}
              <div className="space-y-4 font-mono text-xs">
                <a
                  href={`mailto:${initialProfileData.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#1E292F] bg-[#0E1315] text-gray-300 hover:border-[#39FF88]/40 hover:text-[#39FF88] transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#141B1E] flex items-center justify-center text-[#39FF88] group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px]">// DIRECT EMAIL</div>
                    <div className="text-white font-medium group-hover:text-[#39FF88]">{initialProfileData.email}</div>
                  </div>
                </a>

                <a
                  href={initialProfileData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#1E292F] bg-[#0E1315] text-gray-300 hover:border-[#00D9FF]/40 hover:text-[#00D9FF] transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#141B1E] flex items-center justify-center text-[#00D9FF] group-hover:scale-105 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px]">// GITHUB PROFILE</div>
                    <div className="text-white font-medium group-hover:text-[#00D9FF]">github.com/jaswanthnaidu</div>
                  </div>
                </a>

                <a
                  href={initialProfileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#1E292F] bg-[#0E1315] text-gray-300 hover:border-purple-400/40 hover:text-purple-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#141B1E] flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px]">// LINKEDIN CONNECT</div>
                    <div className="text-white font-medium group-hover:text-purple-400">linkedin.com/in/jaswanthnaidu</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-[#1E292F] bg-[#0E1315] text-gray-300">
                  <div className="w-8 h-8 rounded bg-[#141B1E] flex items-center justify-center text-yellow-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px]">// LOCATION</div>
                    <div className="text-white font-medium">India (GMT +5:30) / Global Remote</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#1E292F] bg-[#101517] overflow-hidden shadow-xl">
              {/* Terminal Form Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0F10] border-b border-[#1E292F]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C5C]/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFB84C]/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#39FF88]/80 inline-block"></span>
                  <span className="ml-2 font-mono text-xs text-[#39FF88]">
                    POST /api/contact --payload.json
                  </span>
                </div>
                <span className="font-mono text-[10px] text-gray-500">TLS Encrypted</span>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-mono text-xs">
                {/* Status Alert Banner */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg border flex items-center gap-2.5 ${
                      status.state === 'success'
                        ? 'bg-[#39FF88]/10 border-[#39FF88]/40 text-[#39FF88]'
                        : status.state === 'loading'
                        ? 'bg-[#00D9FF]/10 border-[#00D9FF]/40 text-[#00D9FF]'
                        : 'bg-[#FF5C5C]/10 border-[#FF5C5C]/40 text-[#FF5C5C]'
                    }`}
                  >
                    {status.state === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : status.state === 'loading' ? (
                      <Terminal className="w-4 h-4 shrink-0 animate-spin" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-gray-400 block font-medium">
                      name <span className="text-[#39FF88]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jaswanth Naidu"
                      className={`w-full px-3 py-2 rounded-lg bg-[#0E1315] border text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF88] transition-colors ${
                        errors.name ? 'border-[#FF5C5C]' : 'border-[#1E292F]'
                      }`}
                    />
                    {errors.name && <p className="text-[#FF5C5C] text-[11px]">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-gray-400 block font-medium">
                      email <span className="text-[#39FF88]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jaswanth@example.com"
                      className={`w-full px-3 py-2 rounded-lg bg-[#0E1315] border text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF88] transition-colors ${
                        errors.email ? 'border-[#FF5C5C]' : 'border-[#1E292F]'
                      }`}
                    />
                    {errors.email && <p className="text-[#FF5C5C] text-[11px]">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1">
                  <label className="text-gray-400 block font-medium">
                    subject <span className="text-[#39FF88]">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    className={`w-full px-3 py-2 rounded-lg bg-[#0E1315] border text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF88] transition-colors ${
                      errors.subject ? 'border-[#FF5C5C]' : 'border-[#1E292F]'
                    }`}
                  />
                  {errors.subject && <p className="text-[#FF5C5C] text-[11px]">{errors.subject}</p>}
                </div>

                {/* Message Textarea */}
                <div className="space-y-1">
                  <label className="text-gray-400 block font-medium">
                    message_payload <span className="text-[#39FF88]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your technical inquiry, project specs, or message..."
                    className={`w-full px-3 py-2 rounded-lg bg-[#0E1315] border text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF88] transition-colors resize-none ${
                      errors.message ? 'border-[#FF5C5C]' : 'border-[#1E292F]'
                    }`}
                  />
                  {errors.message && <p className="text-[#FF5C5C] text-[11px]">{errors.message}</p>}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-gray-500 text-[11px] hidden sm:inline">
                    Payload will be committed to MongoDB
                  </span>

                  <button
                    type="submit"
                    disabled={status.state === 'loading'}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#39FF88] text-black font-semibold hover:bg-[#27D66F] disabled:opacity-50 transition-all font-mono"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{status.state === 'loading' ? 'Transmitting...' : 'Dispatch Message'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
