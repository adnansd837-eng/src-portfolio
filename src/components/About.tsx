import React from 'react';
import { motion } from 'framer-motion';
import { FiCloud, FiCpu, FiServer, FiActivity } from 'react-icons/fi';

const STATS = [
  { 
    id: 1, 
    value: '10+', 
    label: 'DevOps Projects', 
    icon: <FiServer className="text-primary" size={24} />,
    description: 'Kubernetes deployments, Terraform architectures, and scripts.'
  },
  { 
    id: 2, 
    value: '3', 
    label: 'Certifications', 
    icon: <FiCloud className="text-secondary" size={24} />,
    description: 'AWS Solutions Architect, Terraform, and Kubernetes.'
  },
  { 
    id: 3, 
    value: '95%', 
    label: 'Automation Rate', 
    icon: <FiCpu className="text-accent" size={24} />,
    description: 'Reducing manual configurations using Ansible and Bash scripts.'
  },
  { 
    id: 4, 
    value: '100s', 
    label: 'Git Commits', 
    icon: <FiActivity className="text-primary" size={24} />,
    description: 'Active contribution history and version control practices.'
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full glow-gradient-3 blur-[80px] pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Me</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 font-light text-base sm:text-lg leading-relaxed"
          >
            I am a Master of Computer Applications (MCA) student driven by a deep fascination for systems architecture and cloud engineering. My mission is to bridge the gap between development and operations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-slate-300 font-light text-justify"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
              MCA Student & Cloud Automator
            </h3>
            <p>
              My journey in tech began with programming, but I quickly realized that building software is only half the battle—running, scaling, and maintaining it efficiently is where the true engineering lies. This realization directed me toward the Cloud & DevOps path.
            </p>
            <p>
              I specialize in orchestrating containerized applications with <strong className="text-primary">Docker</strong> and <strong className="text-accent">Kubernetes</strong>, automating server provisioning using <strong className="text-primary">Terraform</strong> and config management with <strong className="text-secondary">Ansible</strong>. I host workloads on cloud providers like <strong className="text-primary">AWS</strong>.
            </p>
            <p>
              I believe in "Infrastructure as Code" and automation to minimize human error and streamline build/release processes. Constantly exploring new CNCF (Cloud Native Computing Foundation) tools to keep my skills on the cutting edge.
            </p>
          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glassmorphism-card p-6 rounded-xl relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full translate-x-4 -translate-y-4 transition-transform duration-300 group-hover:scale-110 pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-white/5 shadow-inner">
                    {stat.icon}
                  </div>
                  <span className="text-3xl font-extrabold font-display text-slate-100">
                    {stat.value}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-200 mb-1 group-hover:text-primary transition-colors">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
