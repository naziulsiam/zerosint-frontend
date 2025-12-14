'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/dashboard?target=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <header className="w-full max-w-4xl py-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-terminal text-cyber-accent mb-4">
          ZerOSINT
        </h1>
        <p className="text-cyber-low max-w-2xl mx-auto">
          Passive, legal OSINT intelligence platform for analysts, students, and blue teams.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter username, email, or domain"
              className="flex-1 px-4 py-3 bg-cyber-surface border border-cyber-low rounded-md text-cyber-text placeholder-cyber-low focus:outline-none focus:ring-1 focus:ring-cyber-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-cyber-accent text-cyber-bg font-terminal font-bold rounded-md hover:opacity-90 transition"
            >
              Investigate
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-cyber-low mb-12">
          🔍 Passive OSINT only • No scanning • Public data only
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { title: 'Graph Intelligence', desc: 'Visualize entity relationships' },
            { title: 'AI Summaries', desc: 'Analyst-style risk insights' },
            { title: 'Legal & Ethical', desc: 'Compliant with OSINT best practices' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-cyber-surface rounded-lg border border-cyber-low">
              <h3 className="font-terminal text-cyber-accent mb-2">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-auto py-6 text-cyber-low text-sm">
        <p>ZerOSINT v1.0 • For educational and defensive cybersecurity use only</p>
        <p className="mt-1">© {new Date().getFullYear()} • Passive OSINT Platform</p>
      </footer>
    </div>
  );
}