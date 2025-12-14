import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZerOSINT | Passive OSINT Intelligence Platform',
  description: 'Analyst-grade OSINT platform for ethical, legal intelligence gathering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cyber-bg text-cyber-text font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}