import React from 'react';
import { motion } from 'framer-motion';
import timelineData from '../data/timeline.json';
import { IconRenderer } from './ui/IconRenderer';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20 relative">
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full glow-gradient-2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent">Roadmap</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-secondary via-primary to-accent mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 font-light text-base sm:text-lg leading-relaxed"
          >
            A chronological timeline of my skill progression, from operating system foundations to orchestration, infrastructure automation, and cloud deployments.
          </motion.p>
        </div>

        <div className="relative border-l border-slate-800 md:border-none md:max-w-4xl md:mx-auto">
          <div className="absolute top-0 bottom-0 left-0 md:left-1/2 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          <div className="space-y-12 relative">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={item.id} className="relative flex flex-col md:flex-row md:items-center">
                  <div className="absolute -left-[9px] md:left-1/2 md:-translate-x-[9px] top-1.5 md:top-1/2 md:-translate-y-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0.5, 1.2, 1], opacity: 1 }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="w-[18px] h-[18px] rounded-full bg-slate-900 border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    </motion.div>
                  </div>

                  <div className={`w-full md:w-1/2 pl-6 md:pl-0 md:pr-12 md:text-right ${isEven ? 'md:order-first' : 'md:order-last md:col-start-2'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="glassmorphism p-6 rounded-2xl relative shadow-md"
                    >
                      <div className="flex items-center md:justify-end space-x-2 text-xs font-mono font-semibold text-accent uppercase mb-2">
                        <span>{item.date}</span>
                      </div>

                      <div className="flex items-center md:justify-end space-x-2.5 mb-3">
                        {!isEven && (
                          <div className="p-2 bg-slate-900/80 rounded-lg border border-white/5 shadow-inner text-primary">
                            <IconRenderer name={item.icon} size={16} />
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-slate-100 font-display">
                          {item.title}
                        </h3>
                        {isEven && (
                          <div className="p-2 bg-slate-900/80 rounded-lg border border-white/5 shadow-inner text-primary">
                            <IconRenderer name={item.icon} size={16} />
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-slate-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
