import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import TimelineItem from './TimelineItem';
import { timelineData } from '../../data/portfolioData';
import { GitBranch, GitMerge } from 'lucide-react';

const TimelineSection = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredItems = timelineData.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'EXPERIENCE') return item.type === 'experience' || item.type === 'internship';
    if (activeFilter === 'CERTIFICATIONS') return item.type === 'certification' || item.type === 'achievement';
    return true;
  });

  return (
    <section id="experience" className="py-20 relative bg-[#0B0F10] border-t border-[#1E292F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="04. git_history"
          title="Experience & Milestones"
          description="// chronological commit log of professional roles, internships, and certified achievements"
        />

        {/* Filter bar styled like git branches */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-lg border border-[#1E292F] bg-[#101517] font-mono text-xs">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                activeFilter === 'ALL'
                  ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>all_milestones</span>
            </button>
            <button
              onClick={() => setActiveFilter('EXPERIENCE')}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                activeFilter === 'EXPERIENCE'
                  ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <GitMerge className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>experience & internships</span>
            </button>
            <button
              onClick={() => setActiveFilter('CERTIFICATIONS')}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                activeFilter === 'CERTIFICATIONS'
                  ? 'bg-[#182126] text-[#39FF88] font-bold border border-[#39FF88]/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>nptel & awards</span>
            </button>
          </div>
        </div>

        {/* Vertical Git Timeline List */}
        <div className="relative pl-2 sm:pl-4">
          {filteredItems.map((item, index) => (
            <TimelineItem
              key={item.title + index}
              item={item}
              index={index}
              isLast={index === filteredItems.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
