/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#a855f7',
        dark: '#000',
        light: '#fff',
      },
      backgroundColor: {
        dark: '#000',
        'dark-50': '#f9fafb',
        'dark-100': '#f3f4f6',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
  corePlugins: {
    direction: true,
  },
};
