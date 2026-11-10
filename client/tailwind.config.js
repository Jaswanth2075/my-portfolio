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
        dark: {
          900: '#07090e',
          850: '#0b0f17',
          800: '#111827',
          700: '#1e293b',
          600: '#334155',
        },
        accent: {
          light: '#38bdf8',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
          glow: 'rgba(56, 189, 248, 0.25)',
        },
        secondary: {
          light: '#a855f7',
          DEFAULT: '#8b5cf6',
          dark: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
