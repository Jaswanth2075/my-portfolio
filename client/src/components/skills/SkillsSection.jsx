import React from 'react';
import SectionHeading from '../common/SectionHeading';
import SkillCard from './SkillCard';
import { skillsData } from '../../data/portfolioData';

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 relative bg-[#0B0F10] border-t border-[#1E292F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="02. technical_stack"
          title="Technical Arsenal"
          description="// comprehensive catalog of languages, frameworks, AI/ML tools, and infrastructure"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <SkillCard
              key={category.category}
              index={index}
              category={category.category}
              icon={category.icon}
              description={category.description}
              skills={category.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
