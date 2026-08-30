import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail } from 'react-icons/fi';
import socialLinks from '../data/socialLinks.json';

const TYPED_WORDS = [
  'Cloud & DevOps Engineer',
  'MCA Student',
  'Kubernetes & Docker Specialist',
  'Automation Enthusiast'
];

export const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const currentWord = TYPED_WORDS[wordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentWord) {
      timer = window.setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPED_WORDS.length);
    } else {
      timer = window.setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] md:min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full glow-gradient-1 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full glow-gradient-2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold tracking-wider text-primary uppercase"
          >
            Welcome to my DevOps universe
          </motion.div>

          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Syed Adnan</span>
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-3xl font-bold text-slate-300 h-10 font-mono"
            >
              An aspiring <span className="text-primary typing-cursor">{displayText}</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 max-w-xl font-light leading-relaxed"
          >
            Currently pursuing MCA and specializing in automating cloud infrastructure, orchestrating containers, configuring CI/CD pipelines, and writing robust Infrastructure as Code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300 cursor-pointer"
            >
              <FiMail size={18} />
              <span>Contact Me</span>
            </button>
            <a
              href={socialLinks.resume}
              download
              className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 border border-white/10 hover:border-accent/40 rounded-lg hover:bg-slate-800 transition-colors duration-300 cursor-pointer"
            >
              <FiDownload size={18} />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full max-w-[400px] aspect-square rounded-full flex justify-center items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-500/10 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border border-dashed border-indigo-500/10 pointer-events-none"
            />

            <svg 
              viewBox="0 0 400 400" 
              className="w-full h-full drop-shadow-[0_0_25px_rgba(0,217,255,0.15)] z-10"
            >
              <g className="connections">
                <path d="M 200,160 L 100,240" stroke="#00D9FF" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
                <path d="M 200,160 L 300,240" stroke="#6366F1" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
                <path d="M 200,160 L 200,280" stroke="#14F195" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
              </g>

              {/* Central Server Cloud Node */}
              <motion.g 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="cloud-node cursor-pointer"
              >
                <circle cx="200" cy="160" r="45" fill="url(#heroGrad)" />
                <path 
                  d="M 180,170 A 12,12 0 0,1 180,145 A 16,16 0 0,1 212,140 A 14,14 0 0,1 226,155 A 12,12 0 0,1 218,170 Z" 
                  fill="#FFFFFF" 
                />
                <circle cx="200" cy="160" r="45" fill="none" stroke="#00D9FF" strokeWidth="2" />
              </motion.g>

              {/* Satellite Node: AWS (Left) */}
              <motion.g
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="aws-node cursor-pointer"
              >
                <rect x="70" y="220" width="60" height="40" rx="6" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
                <line x1="80" y1="230" x2="120" y2="230" stroke="#6366F1" strokeWidth="2" />
                <line x1="80" y1="240" x2="110" y2="240" stroke="#6366F1" strokeWidth="2" />
                <circle cx="115" cy="240" r="2" fill="#14F195" className="animate-ping" />
                <line x1="80" y1="250" x2="120" y2="250" stroke="#6366F1" strokeWidth="2" />
                <text x="100" y="275" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">AWS</text>
              </motion.g>

              {/* Satellite Node: Docker (Right) */}
              <motion.g
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="docker-node cursor-pointer"
              >
                <rect x="270" y="220" width="60" height="40" rx="6" fill="#1E293B" stroke="#00D9FF" strokeWidth="2" />
                <rect x="280" y="228" width="10" height="10" rx="2" fill="#00D9FF" />
                <rect x="295" y="228" width="10" height="10" rx="2" fill="#00D9FF" />
                <rect x="310" y="228" width="10" height="10" rx="2" fill="#00D9FF" />
                <rect x="280" y="242" width="10" height="10" rx="2" fill="#00D9FF" />
                <rect x="295" y="242" width="10" height="10" rx="2" fill="#00D9FF" />
                <circle cx="315" cy="247" r="2" fill="#14F195" className="animate-ping" />
                <text x="300" y="275" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">Docker</text>
              </motion.g>

              {/* Satellite Node: Kubernetes (Bottom Center) */}
              <motion.g
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="k8s-node cursor-pointer"
              >
                <polygon points="200,260 225,275 225,305 200,320 175,305 175,275" fill="#1E293B" stroke="#14F195" strokeWidth="2" />
                <circle cx="200" cy="290" r="6" fill="#14F195" />
                <line x1="200" y1="290" x2="200" y2="270" stroke="#14F195" strokeWidth="2" />
                <line x1="200" y1="290" x2="217" y2="300" stroke="#14F195" strokeWidth="2" />
                <line x1="200" y1="290" x2="183" y2="300" stroke="#14F195" strokeWidth="2" />
                <text x="200" y="335" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">K8s</text>
              </motion.g>

              <defs>
                <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00D9FF" stopOpacity="0.8" />
                  <stop offset="100%" stop-color="#6366F1" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
