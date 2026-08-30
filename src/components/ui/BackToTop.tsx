import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.1, translateY: -3 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-30 p-3.5 bg-gradient-to-r from-primary to-secondary text-slate-950 font-bold rounded-full shadow-lg hover:shadow-primary/20 transition-shadow focus:outline-none cursor-pointer"
          aria-label="Back to top"
        >
          <FiArrowUp size={20} className="stroke-[3]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
