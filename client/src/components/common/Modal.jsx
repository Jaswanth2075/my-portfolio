import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl border border-[#1E292F] bg-[#101517] shadow-2xl overflow-hidden z-10"
          >
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E292F] bg-[#0E1315] select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5C5C]/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#FFB84C]/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#39FF88]/80 inline-block"></span>
                <span className="ml-3 font-mono text-xs text-gray-400 truncate max-w-[280px] sm:max-w-md">
                  {title || 'file_viewer.sh'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded text-gray-400 hover:text-[#39FF88] hover:bg-[#1A2226] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto font-sans text-gray-200">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
