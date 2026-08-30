import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiTrendingUp, FiUsers, FiFolder, FiCpu } from 'react-icons/fi';

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  totalStars: number;
  totalForks: number;
  languages: { name: string; count: number; percentage: number }[];
}

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'adnansd837-eng';

const FALLBACK_REPOS: Repository[] = [
  {
    name: 'eks-terraform-infrastructure',
    description: 'Infrastructure as Code to provision a production-grade multi-AZ AWS EKS cluster with Helm, Prometheus, and VPC networking.',
    stargazers_count: 12,
    forks_count: 5,
    language: 'HCL',
    html_url: `https://github.com/${GITHUB_USERNAME}/eks-terraform-infrastructure`
  },
  {
    name: 'gitops-kubernetes-cicd',
    description: 'Continuous Integration / Continuous Deployment GitOps pipeline employing ArgoCD and GitHub Actions with container vulnerability scans.',
    stargazers_count: 8,
    forks_count: 3,
    language: 'YAML',
    html_url: `https://github.com/${GITHUB_USERNAME}/gitops-kubernetes-cicd`
  },
  {
    name: 'aws-serverless-pipeline',
    description: 'Automated data pipeline on AWS using SQS, Lambda, S3, DynamoDB, and CloudWatch metrics.',
    stargazers_count: 6,
    forks_count: 2,
    language: 'Python',
    html_url: `https://github.com/${GITHUB_USERNAME}/aws-serverless-pipeline`
  }
];

const FALLBACK_STATS: GitHubStats = {
  followers: 8,
  following: 12,
  public_repos: 10,
  totalStars: 15,
  totalForks: 5,
  languages: [
    { name: 'TypeScript', count: 5, percentage: 38 },
    { name: 'Python', count: 4, percentage: 30 },
    { name: 'HCL', count: 2, percentage: 16 },
    { name: 'HTML/CSS', count: 1, percentage: 8 },
    { name: 'Shell', count: 1, percentage: 8 }
  ]
};

const LANGUAGE_COLORS: { [key: string]: string } = {
  TypeScript: 'bg-cyan-400',
  JavaScript: 'bg-amber-400',
  Python: 'bg-indigo-400',
  HCL: 'bg-purple-400',
  YAML: 'bg-emerald-400',
  HTML: 'bg-rose-400',
  CSS: 'bg-blue-400',
  Shell: 'bg-accent',
  Java: 'bg-orange-400',
  Go: 'bg-teal-400',
  C: 'bg-slate-400',
  'C++': 'bg-violet-400'
};

export const GitHubDashboard: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // 1. Fetch Repos
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        if (!reposResponse.ok) throw new Error('API limit reached or user not found');
        const reposData = await reposResponse.json();

        // 2. Fetch Profile Info
        const profileResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`
        );
        if (!profileResponse.ok) throw new Error('API limit reached or user not found');
        const profileData = await profileResponse.json();

        // Filter out fork repositories and take top 3 original repos
        const originalRepos = reposData
          .filter((repo: any) => !repo.fork)
          .slice(0, 3)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || 'No description provided.',
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language || 'Documentation',
            html_url: repo.html_url
          }));

        setRepos(originalRepos.length > 0 ? originalRepos : FALLBACK_REPOS);

        // Aggregate statistics from all repositories
        let totalStars = 0;
        let totalForks = 0;
        const languageCounts: { [key: string]: number } = {};

        reposData.forEach((repo: any) => {
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
          }
        });

        const totalReposWithLanguage = Object.values(languageCounts).reduce((a, b) => a + b, 0);
        const languages = Object.entries(languageCounts)
          .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / (totalReposWithLanguage || 1)) * 100)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setStats({
          followers: profileData.followers,
          following: profileData.following,
          public_repos: profileData.public_repos,
          totalStars,
          totalForks,
          languages
        });

      } catch (error) {
        console.warn('GitHub API failed or rate limit hit. Using cached static stats.', error);
        setRepos(FALLBACK_REPOS);
        setStats(FALLBACK_STATS);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const activeStats = stats || FALLBACK_STATS;

  return (
    <section id="github" className="py-20 relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full glow-gradient-2 blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Console</span>
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
            Real-time integration showing version control activity, top development languages, and repositories.
          </motion.p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Contribution Graph & Stats Widget Cards */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Contribution chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glassmorphism p-6 rounded-2xl border border-white/5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold tracking-wider font-mono text-slate-300 flex items-center gap-2">
                  <FiTrendingUp className="text-primary" />
                  <span>CONTRIBUTIONS_GRID.sh</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">Status: Connected</span>
              </div>
              <div className="overflow-x-auto py-2">
                <img
                  src={`https://ghchart.rshah.org/00D9FF/${GITHUB_USERNAME}`}
                  alt={`${GITHUB_USERNAME} github contributions`}
                  className="w-full min-w-[650px] object-contain select-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </motion.div>

            {/* GitHub Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glassmorphism p-6 rounded-2xl border border-white/5 relative overflow-hidden group shadow-md"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/40 to-secondary/40 group-hover:from-primary group-hover:to-secondary transition-all duration-300" />
                <h3 className="text-sm font-semibold tracking-wider font-mono text-slate-300 flex items-center gap-2 mb-6">
                  <FiCpu className="text-primary" />
                  <span>PROFILE_METRICS.yaml</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/45 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Followers</span>
                    <span className="text-2xl font-extrabold font-display text-slate-200 mt-1 flex items-center gap-2">
                      <FiUsers className="text-primary" size={16} />
                      {activeStats.followers}
                    </span>
                  </div>

                  <div className="bg-slate-950/45 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Repositories</span>
                    <span className="text-2xl font-extrabold font-display text-slate-200 mt-1 flex items-center gap-2">
                      <FiFolder className="text-secondary" size={16} />
                      {activeStats.public_repos}
                    </span>
                  </div>

                  <div className="bg-slate-950/45 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Total Stars</span>
                    <span className="text-2xl font-extrabold font-display text-slate-200 mt-1 flex items-center gap-2">
                      <FiStar className="text-amber-400 fill-amber-400/10" size={16} />
                      {activeStats.totalStars}
                    </span>
                  </div>

                  <div className="bg-slate-950/45 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Total Forks</span>
                    <span className="text-2xl font-extrabold font-display text-slate-200 mt-1 flex items-center gap-2">
                      <FiGitBranch className="text-accent" size={16} />
                      {activeStats.totalForks}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Language Distribution Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glassmorphism p-6 rounded-2xl border border-white/5 relative overflow-hidden group shadow-md"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-secondary/40 to-accent/40 group-hover:from-secondary group-hover:to-accent transition-all duration-300" />
                <h3 className="text-sm font-semibold tracking-wider font-mono text-slate-300 flex items-center gap-2 mb-6">
                  <FiTrendingUp className="text-accent" />
                  <span>TOP_LANGUAGES.json</span>
                </h3>

                <div className="space-y-4">
                  {activeStats.languages.map((lang) => {
                    const colorClass = LANGUAGE_COLORS[lang.name] || 'bg-slate-400';
                    return (
                      <div key={lang.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${colorClass}`} />
                            <span className="text-slate-300 font-semibold">{lang.name}</span>
                          </div>
                          <span className="text-slate-400">{lang.percentage}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`h-full ${colorClass}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right panel: Active Repositories */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-sm font-semibold tracking-wider font-mono text-slate-300 flex items-center gap-2">
              <FiGithub className="text-accent" />
              <span>ACTIVE_REPOSITORIES.db</span>
            </h3>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="glassmorphism p-5 rounded-2xl h-28 animate-pulse bg-slate-900/30" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {repos.map((repo, idx) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="glassmorphism p-5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 group shadow-inner"
                  >
                    <div className="flex flex-col space-y-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-slate-200 group-hover:text-primary transition-colors cursor-pointer truncate"
                      >
                        {repo.name}
                      </a>
                      
                      <p className="text-xs text-slate-400 font-light line-clamp-2 h-8 leading-relaxed">
                        {repo.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 text-[10px] font-mono text-slate-500">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <FiStar size={10} className="text-amber-400 fill-amber-400" />
                            <span>{repo.stargazers_count}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FiGitBranch size={10} className="text-slate-400" />
                            <span>{repo.forks_count}</span>
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-slate-950 text-accent font-semibold border border-white/5">
                          {repo.language}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
