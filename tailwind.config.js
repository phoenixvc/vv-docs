/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Support Docusaurus dark mode
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      colors: {
        // Match your VeritasVault brand colors
        primary: {
          light: '#6ba5e7',
          DEFAULT: '#4a90e2',
          dark: '#3a7bc0',
        },
        secondary: {
          light: '#f7b84d',
          DEFAULT: '#f5a623',
          dark: '#d48c1c',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
  // Safelist ensures these classes are always included in your CSS
  safelist: [
    'animate-fade-in',
    'animate-slide-in',
    'animate-pulse-slow',
  ],
  // This is important for Docusaurus compatibility
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with Docusaurus
  },
}