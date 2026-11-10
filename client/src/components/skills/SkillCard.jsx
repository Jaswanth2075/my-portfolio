import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Cpu, Terminal, CheckCircle2 } from 'lucide-react';

const ICON_MAP = {
  Code2,
  Layout,
  Server,
  Database,
  Cpu,
  Terminal,
};

const SkillCard = ({ category, icon, description, skills, index }) => {
  const IconComponent = ICON_MAP[icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl border border-[#1E292F] bg-[#101517] p-6 hover:border-[#39FF88]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
    >
      <div>
        {/* Card Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#141B1E] border border-[#1E292F] flex items-center justify-center text-[#39FF88] group-hover:border-[#39FF88]/40 group-hover:shadow-[0_0_15px_rgba(57,255,136,0.15)] transition-all">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-white group-hover:text-[#39FF88] transition-colors">
                {category}
              </h3>
              <span className="font-mono text-[10px] text-gray-500">
                {skills.length} modules loaded
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 font-sans mb-5 leading-relaxed">
          {description}
        </p>

        {/* Skill Items List */}
        <div className="space-y-3">
          {skills.map((skill, sIdx) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-gray-200 flex items-center gap-1.5">
                  <span className="text-[#39FF88] text-[10px]">&gt;</span>
                  <span className="font-medium">{skill.name}</span>
                </span>
                <span className="text-gray-500 text-[11px]">{skill.tag}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#141B1E] rounded-full overflow-hidden border border-[#1E292F]/50">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + sIdx * 0.05 }}
                  className="h-full bg-gradient-to-r from-[#00D9FF] to-[#39FF88] rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal mini footer */}
      <div className="mt-6 pt-3 border-t border-[#1E292F] flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span className="flex items-center gap-1 text-[#39FF88]">
          <CheckCircle2 className="w-3 h-3" />
          <span>Verified Skillset</span>
        </span>
        <span>INDEX #{index + 1}</span>
      </div>
    </motion.div>
  );
};

export default SkillCard;
