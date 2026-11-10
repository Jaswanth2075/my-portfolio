import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ tag, title, description, align = 'center' }) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-md border border-[#1E292F] bg-[#101517] font-mono text-xs text-[#39FF88]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-pulse"></span>
        <span>{tag}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl md:text-4xl font-mono font-bold tracking-tight text-white mb-3"
      >
        <span className="text-gray-500 font-light">&lt;</span>
        <span className="text-white hover:text-[#39FF88] transition-colors">{title}</span>
        <span className="text-gray-500 font-light">&nbsp;/&gt;</span>
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-mono text-xs md:text-sm text-gray-400 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
