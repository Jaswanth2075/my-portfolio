/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0B0F10',
          panel: '#101517',
          surface: '#141B1E',
          card: '#161E22',
          border: '#1E292F',
          borderHighlight: '#2A3B44',
          muted: '#8395A1',
          dim: '#4E5F69',
        },
        neon: {
          green: '#39FF88',
          greenDark: '#27D66F',
          greenDim: 'rgba(57, 255, 136, 0.15)',
          greenGlow: 'rgba(57, 255, 136, 0.35)',
          cyan: '#00D9FF',
          cyanDark: '#00B4D8',
          cyanDim: 'rgba(0, 217, 255, 0.15)',
          cyanGlow: 'rgba(0, 217, 255, 0.35)',
          amber: '#FFB84C',
          red: '#FF5C5C',
          purple: '#B779FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'cursor-blink': 'cursorBlink 1s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        cursorBlink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
