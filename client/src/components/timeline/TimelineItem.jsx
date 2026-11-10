import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, GraduationCap, Trophy, GitCommit } from 'lucide-react';

const TYPE_CONFIG = {
  experience: {
    icon: Briefcase,
    color: '#39FF88',
    label: 'EXPERIENCE',
    badgeClass: 'bg-[#39FF88]/10 text-[#39FF88] border-[#39FF88]/30',
  },
  internship: {
    icon: Briefcase,
    color: '#00D9FF',
    label: 'INTERNSHIP',
    badgeClass: 'bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30',
  },
  certification: {
    icon: Award,
    color: '#FFB84C',
    label: 'CERTIFICATION',
    badgeClass: 'bg-[#FFB84C]/10 text-[#FFB84C] border-[#FFB84C]/30',
  },
  achievement: {
    icon: Trophy,
    color: '#B779FF',
    label: 'ACHIEVEMENT',
    badgeClass: 'bg-[#B779FF]/10 text-[#B779FF] border-[#B779FF]/30',
  },
};

const TimelineItem = ({ item, index, isLast }) => {
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.experience;
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex gap-4 sm:gap-6 group"
    >
      {/* Git Timeline Node and Line */}
      <div className="flex flex-col items-center">
        {/* Node Circle */}
        <div
          className="w-9 h-9 rounded-full bg-[#101517] border-2 flex items-center justify-center shrink-0 z-10 transition-transform duration-300 group-hover:scale-110 shadow-lg"
          style={{ borderColor: config.color }}
        >
          <IconComponent className="w-4 h-4" style={{ color: config.color }} />
        </div>

        {/* Continuous Connecting Vertical Line */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-[#1E292F] via-[#2A3B44] to-[#1E292F] my-2" />
        )}
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-8">
        <div className="rounded-xl border border-[#1E292F] bg-[#101517] p-5 sm:p-6 group-hover:border-[#39FF88]/40 transition-all duration-300 shadow-md">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
            <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${config.badgeClass}`}>
              {config.label}
            </span>
            <span className="text-gray-400 flex items-center gap-1">
              <GitCommit className="w-3.5 h-3.5 text-gray-500" />
              <span>{item.period}</span>
            </span>
          </div>

          {/* Title & Organization */}
          <h3 className="font-mono text-base sm:text-lg font-bold text-white group-hover:text-[#39FF88] transition-colors">
            {item.title}
          </h3>
          <div className="text-xs font-mono text-[#00D9FF] mb-3">
            {item.organization} {item.location && <span className="text-gray-500">({item.location})</span>}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tags */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E292F]">
              {item.highlights.map((h) => (
                <span
                  key={h}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141B1E] text-gray-300 border border-[#1E292F]"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
