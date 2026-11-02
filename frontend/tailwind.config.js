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
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        paddy: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        cream: '#fefce8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(20, 83, 45, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(250, 204, 21, 0.4)',
      },
      animation: {
        'sway': 'sway 4s ease-in-out infinite alternate',
        'sway-slow': 'sway 7s ease-in-out infinite alternate',
        'laser-sweep': 'laserSweep 2.2s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite',
      },
      keyframes: {
        sway: {
          '0%': { transform: 'rotate(-2.5deg) skewX(-1.5deg)' },
          '100%': { transform: 'rotate(3.5deg) skewX(2deg)' },
        },
        laserSweep: {
          '0%': { top: '0%', opacity: '0.8' },
          '50%': { top: '96%', opacity: '1' },
          '100%': { top: '0%', opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        }
      }
    },
  },
  plugins: [],
}
