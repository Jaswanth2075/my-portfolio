import React from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import SkillsSection from '../components/skills/SkillsSection';
import ProjectsSection from '../components/projects/ProjectsSection';
import TimelineSection from '../components/timeline/TimelineSection';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/common/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0B0F10] text-gray-200 selection:bg-[#39FF88]/20 selection:text-[#39FF88]">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
