import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiCpu, FiTerminal, FiAlertTriangle } from 'react-icons/fi';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [terminalStep, setTerminalStep] = useState(0);
  const [isRunningRecovery, setIsRunningRecovery] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (isRunningRecovery) {
      if (terminalStep < 4) {
        const timer = setTimeout(() => {
          setTerminalStep((prev) => prev + 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              navigate('/');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [isRunningRecovery, terminalStep, navigate]);

  const handleStartRecovery = () => {
    setIsRunningRecovery(true);
    setTerminalStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative font-mono overflow-hidden">
      <div className="absolute w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl z-10 text-center space-y-8">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-flex p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-full shadow-lg"
        >
          <FiAlertTriangle size={48} className="stroke-[1.5]" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-500 tracking-wider">
            CRITICAL_ERROR: 404
          </h1>
          <p className="text-slate-400 text-sm">
            Node Not Found. The requested path does not exist on this server cluster.
          </p>
        </div>

        <div className="glassmorphism rounded-xl border border-white/10 text-left overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">devops-shell</span>
          </div>

          <div className="p-5 text-xs sm:text-sm space-y-4 h-64 overflow-y-auto text-slate-300">
            <div>
              <span className="text-primary font-bold">$</span> curl -I https://adnan.dev/requested-node
            </div>
            <div className="text-rose-500 font-semibold font-mono">
              HTTP/1.1 404 NOT FOUND
              <br />
              Server: AWS-CloudFront/Orchestrator
              <br />
              X-Cache: Error-From-Origin
            </div>

            {terminalStep >= 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="text-primary font-bold">$</span> ansible-playbook site.yml --tags recovery
              </motion.div>
            )}

            {terminalStep >= 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-500">
                [PLAY 1] Running Automated Disaster Recovery Script...
              </motion.div>
            )}

            {terminalStep >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400">
                [TASK 1.1] Re-routing traffic to primary node ... [OK]
                <br />
                [TASK 1.2] Checking server stack load ... [HEALTHY]
              </motion.div>
            )}

            {terminalStep >= 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-bold">
                [RECOVERY OK] Safe node found! Redirecting to /home in {countdown}s...
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!isRunningRecovery ? (
            <>
              <button
                onClick={handleStartRecovery}
                className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-rose-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <FiCpu size={18} />
                <span>Run Auto-Recovery Playbook</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-6 py-3.5 bg-slate-900 border border-white/5 hover:border-slate-700 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                <FiHome size={18} className="text-primary" />
                <span>Return Home Safely</span>
              </button>
            </>
          ) : (
            <div className="text-slate-500 flex items-center space-x-2 text-xs">
              <FiTerminal className="animate-pulse text-accent" />
              <span>Executing recovery playbooks... Standby.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
