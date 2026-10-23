import React, { useEffect, useState } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
}

interface GitHubRepoViewerProps {
  username: string;
}

export const GitHubRepoViewer: React.FC<GitHubRepoViewerProps> = ({ username }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!res.ok) {
          throw new Error(`GitHub user "${username}" not found or API rate limited.`);
        }
        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data);
          } else {
            setRepos([]);
          }
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Could not load GitHub repositories.');
          setLoading(false);
        }
      }
    };

    fetchRepos();
    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <div className="mt-8 p-6 rounded-3xl bg-[rgba(17,15,28,0.7)] border border-[rgba(255,255,255,0.1)] backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
            <h3 className="text-xl font-bold text-[#f5f3ff]">GitHub Public Repositories</h3>
          </div>
          <p className="text-xs text-[#a7a3c0] mt-1">
            Live from <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-[#22d3ee] underline hover:text-white">github.com/{username}</a>
          </p>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="rip self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#f5f3ff] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.16)] border border-[rgba(255,255,255,0.12)] transition-colors"
        >
          <span>Visit GitHub Profile</span>
          <span>↗</span>
        </a>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-sm text-[#a7a3c0]">
          <span className="w-4 h-4 border-2 border-[#7c5cff] border-t-transparent rounded-full animate-spin mr-3" />
          <span>Fetching repositories from GitHub API...</span>
        </div>
      ) : error || repos.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
          <p className="text-sm text-[#a7a3c0] mb-2">
            {error || `No public repositories found for @${username} yet.`}
          </p>
          <p className="text-xs text-[#a7a3c0]/70 mb-4">
            You can modify the username in the Edit details drawer (✎) or visit GitHub directly.
          </p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="rip inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite]"
          >
            Open github.com/{username} ↗
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-[#f5f3ff] group-hover:text-[#22d3ee] transition-colors truncate">
                    {repo.name}
                  </h4>
                  <span className="text-xs text-[#a7a3c0] shrink-0">↗</span>
                </div>
                <p className="text-xs text-[#a7a3c0] line-clamp-2 leading-relaxed mb-4">
                  {repo.description || 'Public GitHub repository code & assets.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#a7a3c0] pt-2 border-t border-[rgba(255,255,255,0.06)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7c5cff]" />
                  <span>{repo.language || 'Code'}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
