import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_MESSAGES = [
  'Initializing cloud console...',
  'Establishing secure SSH handshake...',
  'Configuring AWS credentials...',
  'Mounting Kubernetes volumes...',
  'Setting up GitOps pipeline...',
  'Syncing Terraform modules...',
  'DevOps Environment Ready.'
];

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoaded(true), 600);
          return 100;
        }
        const rand = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + rand, 100);
      });
    }, 120);

    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev < BOOT_MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 p-4"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl translate-x-12 translate-y-12" />

          <div className="relative mb-8">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="90"
              height="90"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <defs>
                <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00D9FF" />
                  <stop offset="100%" stop-color="#6366F1" />
                </linearGradient>
              </defs>
              <path
                d="M 30,65 A 15,15 0 0,1 30,35 A 20,20 0 0,1 65,30 A 18,18 0 0,1 80,48 A 15,15 0 0,1 70,65 Z"
                fill="url(#loadGrad)"
              />
              <path
                d="M 40,43 L 32,48 L 40,53 M 60,43 L 68,48 L 60,53 M 52,41 L 48,55"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </motion.svg>
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-500/30 scale-125"
              animate={{ scale: [1.25, 1.45, 1.25], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <div className="w-full max-w-sm font-mono text-center">
            <h3 className="text-xl font-bold tracking-wider text-slate-100 mb-2">
              SYED ADNAN
            </h3>
            <p className="text-xs text-primary/80 mb-6 h-5 truncate">
              $ {BOOT_MESSAGES[msgIndex]}
            </p>

            <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>DEPLOYING SYSTEM</span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
