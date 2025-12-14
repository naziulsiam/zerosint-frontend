'use client';

import { useEffect, useState } from 'react';

export default function TimelineView() {
  const [events] = useState([
    { date: '2023-05-12', source: 'github', desc: 'Account created', url: '#' },
    { date: '2023-06-18', source: 'github', desc: 'First public commit (email exposed)', url: '#' },
    { date: '2024-01-30', source: 'pastebin', desc: 'Username mentioned in paste', url: '#' },
    { date: '2024-11-05', source: 'forum', desc: 'Profile on security forum', url: '#' },
  ].reverse());

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-terminal text-cyber-accent mb-6">Activity Timeline</h2>
      <div className="max-w-3xl mx-auto">
        {events.map((event, i) => (
          <div key={i} className="relative pl-8 pb-8 border-l border-cyber-low">
            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-cyber-accent"></div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-cyber-highlight">{event.date}</span>
              <span className="text-xs px-2 py-0.5 bg-cyber-surface rounded text-cyber-accent">
                {event.source}
              </span>
            </div>
            <p className="mt-1">{event.desc}</p>
            <a
              href={event.url}
              className="text-cyber-low text-sm underline hover:text-cyber-highlight"
              target="_blank"
              rel="noopener noreferrer"
            >
              View evidence
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}