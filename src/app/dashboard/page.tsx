'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const target = searchParams.get('target') || 'unknown';
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [riskScore, setRiskScore] = useState(0);

  // Simulate API call
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // In real deployment, call your FastAPI backend
      await new Promise((r) => setTimeout(r, 1500));
      setSummary(
        `The target shows consistent username reuse across GitHub and multiple forums, increasing attribution confidence. Public Git commits expose an email address linked to a personal domain.`
      );
      setRiskScore(0.78);
      setLoading(false);
    };
    fetchData();
  }, [target]);

  if (!target) return <div className="p-8">No target provided.</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-terminal text-cyber-accent">
            Investigation: <span className="text-cyber-text">{target}</span>
          </h2>
          <div className="mt-2 sm:mt-0">
            <Link
              href="/"
              className="text-cyber-highlight hover:underline font-terminal"
            >
              ← New Investigation
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse-slow">
              <div className="w-4 h-4 rounded-full bg-cyber-accent mx-auto"></div>
              <div className="mt-2 text-cyber-low">Collecting passive intelligence...</div>
            </div>
          </div>
        ) : (
          <>
            {/* Risk Banner */}
            <div className="bg-cyber-surface border-l-4 border-cyber-accent p-4 mb-6 rounded">
              <div className="flex justify-between items-center">
                <span className="font-terminal text-cyber-accent">Exposure Risk</span>
                <span className="font-bold text-cyber-highlight">{(riskScore * 100).toFixed(0)}%</span>
              </div>
              <p className="text-sm mt-2 text-cyber-low">
                Identity traceability and public data reuse detected.
              </p>
            </div>

            {/* AI Summary */}
            <div className="bg-cyber-surface p-4 mb-6 rounded">
              <h3 className="font-terminal text-cyber-accent mb-2">Intelligence Summary</h3>
              <p className="whitespace-pre-line">{summary}</p>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { name: 'Graph View', href: `/graph?target=${encodeURIComponent(target)}` },
                { name: 'Timeline', href: `/timeline?true` },
                { name: 'Report', href: `/report?target=${encodeURIComponent(target)}` },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="p-4 bg-cyber-surface border border-cyber-low text-center rounded hover:border-cyber-accent transition font-terminal"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="text-xs text-cyber-low text-center mt-12">
          ⚠️ This platform uses only publicly available data. All investigations must comply with local laws and ethical guidelines.
        </div>
      </div>
    </div>
  );
}