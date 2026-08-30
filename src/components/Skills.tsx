import React from 'react';
import { motion } from 'framer-motion';
import skillsData from '../data/skills.json';
import { IconRenderer } from './ui/IconRenderer';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full glow-gradient-1 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 font-light text-base sm:text-lg leading-relaxed"
          >
            My specialized technology stack, grouped by operational role. Focuses on automation reliability and cloud deployments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((categoryData, catIdx) => (
            <motion.div
              key={categoryData.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.05 }}
              className="glassmorphism p-6 rounded-2xl relative overflow-hidden group shadow-md"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/40 to-secondary/40 group-hover:from-primary group-hover:to-accent transition-all duration-300" />
              
              <h3 className="text-lg font-bold text-slate-100 mb-6 font-display group-hover:text-primary transition-colors duration-300">
                {categoryData.category}
              </h3>

              <div className="space-y-5">
                {categoryData.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2.5">
                        <IconRenderer name={skill.icon} className="text-slate-400 group-hover:text-primary transition-colors" size={18} />
                        <span className="font-medium text-slate-200">{skill.name}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-xs">{skill.level}%</span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                    {skill.details && (
                      <p className="text-[10px] text-slate-500 font-light font-mono pl-7">
                        {skill.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
