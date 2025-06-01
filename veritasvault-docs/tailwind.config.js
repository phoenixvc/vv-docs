/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'rounded-lg',
    'bg-gray-100',
    'dark:bg-gray-800',
    'p-4',
    'shadow-md',
    'hover:shadow-lg',
    'transition-shadow',
    'duration-300',
    {
      pattern: /docusaurus-theme-.*/,
    }
  ],
  corePlugins: {
    preflight: false,
  },
};