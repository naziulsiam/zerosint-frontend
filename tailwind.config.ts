import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a0a',
          surface: '#121212',
          text: '#e0e0e0',
          accent: '#00ffaa',
          highlight: '#00ffff',
          low: '#444444',
        }
      },
      fontFamily: {
        terminal: ['"Fira Code"', 'monospace', 'ui-monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px theme("colors.cyber.accent")' },
          '100%': { boxShadow: '0 0 20px theme("colors.cyber.accent")' },
        }
      }
    },
  },
  plugins: [],
};
export default config;