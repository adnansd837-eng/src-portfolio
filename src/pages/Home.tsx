import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Timeline } from '../components/Timeline';
import { GitHubDashboard } from '../components/GitHubDashboard';
import { Resume } from '../components/Resume';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { ParticleBackground } from '../components/ui/ParticleBackground';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { BackToTop } from '../components/ui/BackToTop';

export const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen text-slate-200 transition-colors duration-300">
      <LoadingScreen />
      <ScrollProgress />
      <ParticleBackground />
      <BackToTop />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <GitHubDashboard />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};
