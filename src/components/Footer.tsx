import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import socialLinks from '../data/socialLinks.json';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-6 h-6">
              <defs>
                <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00D9FF" />
                  <stop offset="100%" stop-color="#6366F1" />
                </linearGradient>
              </defs>
              <path d="M 30,65 A 15,15 0 0,1 30,35 A 20,20 0 0,1 65,30 A 18,18 0 0,1 80,48 A 15,15 0 0,1 70,65 Z" fill="url(#footerGrad)" />
            </svg>
            <span className="text-base font-bold font-display tracking-wide text-slate-100">
              Syed Adnan
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-light font-mono">
            BUILD. AUTOMATE. SCALE.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-light font-mono text-center md:text-left">
          &copy; {currentYear} Syed Adnan. All rights reserved. Created with React & Tailwind.
        </div>

        <div className="flex items-center space-x-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-white/5 hover:border-primary/20 bg-slate-900/30 hover:bg-slate-900/60 text-slate-400 hover:text-primary transition-all duration-300 cursor-pointer"
            aria-label="GitHub Profile"
          >
            <FiGithub size={16} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-white/5 hover:border-secondary/20 bg-slate-900/30 hover:bg-slate-900/60 text-slate-400 hover:text-secondary transition-all duration-300 cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin size={16} />
          </a>
          <a
            href={socialLinks.email}
            className="p-2.5 rounded-lg border border-white/5 hover:border-accent/20 bg-slate-900/30 hover:bg-slate-900/60 text-slate-400 hover:text-accent transition-all duration-300 cursor-pointer"
            aria-label="Send Email"
          >
            <FiMail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};
