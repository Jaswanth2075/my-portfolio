import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Compass, Terminal, Cpu, Award } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { initialProfileData } from '../../data/portfolioData';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative bg-[#0B0F10] border-t border-[#1E292F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="01. about_me"
          title="Engineering Profile"
          description="// inspecting runtime parameters, education, and development journey"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Code Editor Panel: developer_spec.json */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 rounded-xl border border-[#1E292F] bg-[#101517] overflow-hidden shadow-xl"
          >
            {/* Editor Tab Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0F10] border-b border-[#1E292F]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C5C]/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB84C]/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#39FF88]/80 inline-block"></span>
                <span className="ml-2 font-mono text-xs text-[#00D9FF]">developer_spec.ts</span>
              </div>
              <span className="font-mono text-[10px] text-gray-500">TypeScript</span>
            </div>

            {/* Code Body with line numbers */}
            <div className="p-4 font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto bg-[#0A0D0E]">
              <div className="space-y-1">
                <div><span className="text-purple-400">export const</span> <span className="text-yellow-300">JaswanthNaidu</span> = &#123;</div>
                <div className="pl-4"><span className="text-cyan-400">name</span>: <span className="text-green-300">"{initialProfileData.name}"</span>,</div>
                <div className="pl-4"><span className="text-cyan-400">role</span>: <span className="text-green-300">"Full Stack Developer"</span>,</div>
                <div className="pl-4"><span className="text-cyan-400">interests</span>: [</div>
                <div className="pl-8 text-emerald-400">"Full-Stack Architectures",</div>
                <div className="pl-8 text-emerald-400">"Generative AI & LLMs",</div>
                <div className="pl-8 text-emerald-400">"RAG Applications",</div>
                <div className="pl-8 text-emerald-400">"Computer Vision"</div>
                <div className="pl-4">],</div>
                <div className="pl-4"><span className="text-cyan-400">methodology</span>: <span className="text-green-300">"Clean Code & Resilient APIs"</span>,</div>
                <div className="pl-4"><span className="text-cyan-400">isAvailable</span>: <span className="text-purple-400">true</span>,</div>
                <div className="pl-4"><span className="text-cyan-400">contact</span>: &#123;</div>
                <div className="pl-8"><span className="text-cyan-400">email</span>: <span className="text-green-300">"{initialProfileData.email}"</span>,</div>
                <div className="pl-8"><span className="text-cyan-400">github</span>: <span className="text-green-300">"github.com/jaswanthnaidu"</span></div>
                <div className="pl-4">&#125;</div>
                <div>&#125;;</div>
              </div>
            </div>

            {/* Terminal Quote / Mini Status */}
            <div className="p-3 bg-[#0E1315] border-t border-[#1E292F] font-mono text-[11px] text-gray-400 flex items-center justify-between">
              <span className="text-[#39FF88] flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                <span>compiled with zero warnings</span>
              </span>
              <span className="text-gray-500">UTF-8</span>
            </div>
          </motion.div>

          {/* Details & Narrative: Journey, Education, Goals */}
          <div className="lg:col-span-7 space-y-6">
            {/* Journey Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-xl border border-[#1E292F] bg-[#101517] space-y-3"
            >
              <div className="flex items-center gap-2 font-mono text-sm text-[#39FF88]">
                <Compass className="w-4 h-4" />
                <span className="font-semibold">Software Development Journey</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {initialProfileData.journey}
              </p>
            </motion.div>

            {/* Career Objectives Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 rounded-xl border border-[#1E292F] bg-[#101517] space-y-3"
            >
              <div className="flex items-center gap-2 font-mono text-sm text-[#00D9FF]">
                <Target className="w-4 h-4" />
                <span className="font-semibold">Career Objectives</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {initialProfileData.careerObjectives}
              </p>
            </motion.div>

            {/* Educational Background */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-6 rounded-xl border border-[#1E292F] bg-[#101517] space-y-3"
            >
              <div className="flex items-center gap-2 font-mono text-sm text-purple-400">
                <GraduationCap className="w-4 h-4" />
                <span className="font-semibold">Educational Background</span>
              </div>

              {initialProfileData.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-[#1E292F] pl-4 space-y-1">
                  <div className="text-white font-medium text-sm">{edu.degree}</div>
                  <div className="text-xs font-mono text-gray-400 flex items-center justify-between">
                    <span>{edu.institution}</span>
                    <span className="text-[#39FF88]">{edu.period}</span>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">{edu.grade}</div>
                  <p className="text-xs text-gray-400 pt-1">{edu.details}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
