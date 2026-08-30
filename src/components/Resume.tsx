import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiBriefcase, FiBookOpen, FiCommand } from 'react-icons/fi';
import socialLinks from '../data/socialLinks.json';

const TAB_DATA = [
  {
    id: 'education',
    label: 'Education',
    icon: <FiBookOpen size={16} />,
    items: [
      {
        title: 'Master of Computer Applications (MCA)',
        organization: 'Current University',
        date: '2024 - 2026',
        details: 'Specializing in Advanced Software Systems, Systems Programming, Database Systems, and Cloud Architectures. CGPA: 8.5/10 (Equivalent)'
      },
      {
        title: 'Bachelor of Computer Applications (BCA)',
        organization: 'Previous College',
        date: '2021 - 2024',
        details: 'Learned fundamental algorithms, data structures, network security, software engineering, and object-oriented programming.'
      }
    ]
  },
  {
    id: 'projects',
    label: 'Key Academic Work',
    icon: <FiBriefcase size={16} />,
    items: [
      {
        title: 'GitOps Containerization & Orchestration Orchestrator',
        organization: 'Self-Directed Study',
        date: '2025',
        details: 'Created an automated GitOps deployment engine that scans Dockerfiles for secure configurations and automatically syncs changes to EKS via ArgoCD.'
      },
      {
        title: 'AWS Distributed Systems Cloud Environment',
        organization: 'Systems Design Project',
        date: '2025',
        details: 'Designed and deployed a highly-available, fault-tolerant web server tier utilizing Auto Scaling Groups, Elastic Load Balancers, and RDS multi-AZ failovers.'
      }
    ]
  },
  {
    id: 'credentials',
    label: 'DevOps Stack',
    icon: <FiCommand size={16} />,
    items: [
      {
        title: 'Infrastructure Automation Stack',
        organization: 'Terraform & Ansible Integration',
        date: '2025',
        details: 'Standardized developmental, staging, and production workspace stacks into declarative scripts. Automated user groups, firewall keys, and database patches.'
      },
      {
        title: 'Linux Systems & Kernel Operations',
        organization: 'Linux System Administration & scripting',
        date: '2024',
        details: 'Highly proficient in Bash scripting, monitoring process telemetry, inspecting network sockets, and automating backups.'
      }
    ]
  }
];

export const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState('education');

  const currentTab = TAB_DATA.find((tab) => tab.id === activeTab);

  return (
    <section id="resume" className="py-20 relative">
      <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full glow-gradient-1 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Resume</span>
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
            Browse my education, systems projects, and devops methodologies. Download the complete PDF version below.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl mx-auto">
          <div className="flex flex-row md:flex-col w-full md:w-64 gap-2 border-b md:border-b-0 md:border-l border-white/5 pb-4 md:pb-0 md:pl-4">
            {TAB_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 w-full cursor-pointer justify-center md:justify-start ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary border-l-2 md:border-l-4 border-primary'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-grow w-full min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {currentTab?.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="glassmorphism-card p-6 rounded-2xl border border-white/5 relative group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full self-start">
                        {item.date}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-300 mb-3">
                      {item.organization}
                    </h4>
                    
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href={socialLinks.resume}
            download
            className="inline-flex items-center space-x-2.5 px-7 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-slate-950 font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <FiDownload size={18} className="stroke-[2.5]" />
            <span>Download Complete Resume (PDF)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
