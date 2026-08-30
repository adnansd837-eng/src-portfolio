import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import socialLinks from '../data/socialLinks.json';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.log('EmailJS keys are missing. Simulating successful form submission: ', formData);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);
      return;
    }

    try {
      if (formRef.current) {
        const result = await emailjs.sendForm(
          serviceId,
          templateId,
          formRef.current,
          publicKey
        );
        if (result.text === 'OK') {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('EmailJS rejection');
        }
      }
    } catch (err) {
      console.error('Failed to dispatch contact message:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full glow-gradient-1 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 font-light text-base sm:text-lg leading-relaxed"
          >
            Have a project in mind, an internship opportunity, or want to talk cloud infrastructure? Drop a message.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-100 font-display">
                Connection Channels
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                Whether you need a script automated, container configurations optimized, or cloud instances launched, I am ready to collaborate. Let's build stable systems!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={socialLinks.email}
                className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-900/60 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 bg-slate-950 rounded-lg text-primary">
                  <FiMail size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 font-mono">SEND AN EMAIL</h4>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-primary transition-colors">
                    adnansd837@gmail.com
                  </span>
                </div>
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-900/60 hover:border-secondary/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 bg-slate-950 rounded-lg text-secondary">
                  <FiLinkedin size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 font-mono">LINKEDIN PROFILE</h4>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-secondary transition-colors">
                    syed-adnan-
                  </span>
                </div>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-900/60 hover:border-accent/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 bg-slate-950 rounded-lg text-accent">
                  <FiGithub size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 font-mono">GITHUB REPOSITORIES</h4>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-accent transition-colors">
                    github.com/adnansd837-eng
                  </span>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glassmorphism p-8 rounded-3xl border border-white/5 shadow-xl relative"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-mono font-semibold text-slate-400">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-slate-950 border rounded-lg text-slate-200 text-sm focus:outline-none transition-all duration-300 ${
                      errors.name ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/5 focus:border-primary/50'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-[10px] text-rose-500 pl-1">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-mono font-semibold text-slate-400">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-slate-950 border rounded-lg text-slate-200 text-sm focus:outline-none transition-all duration-300 ${
                      errors.email ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/5 focus:border-primary/50'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 pl-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="text-xs font-mono font-semibold text-slate-400">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-950 border rounded-lg text-slate-200 text-sm focus:outline-none transition-all duration-300 ${
                    errors.subject ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/5 focus:border-primary/50'
                  }`}
                  placeholder="System architecture consultation / Job Opportunity"
                />
                {errors.subject && <p className="text-[10px] text-rose-500 pl-1">{errors.subject}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-mono font-semibold text-slate-400">
                  MESSAGE BODY
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-slate-950 border rounded-lg text-slate-200 text-sm focus:outline-none transition-all duration-300 resize-none ${
                    errors.message ? 'border-rose-500/50 focus:border-rose-500' : 'border-white/5 focus:border-primary/50'
                  }`}
                  placeholder="Tell me about your tech stack and requirements..."
                />
                {errors.message && <p className="text-[10px] text-rose-500 pl-1">{errors.message}</p>}
              </div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center space-x-2.5"
                  >
                    <FiCheckCircle size={16} className="shrink-0" />
                    <span>Deployment Complete! Your message has been sent successfully. I'll get back to you shortly.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-center space-x-2.5"
                  >
                    <FiAlertCircle size={16} className="shrink-0" />
                    <span>Error: Pipeline Failed. Could not send message. Please email me directly instead.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-primary/10 transition-shadow disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
