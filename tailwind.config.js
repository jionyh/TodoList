/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/layout/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        purple: '#8284FA',
        'purple-dark': '#5E60CE',
        blue: '#4Ea8DE',
        'blue-dark': '#1e6f9f',
        'cinza-700': '#0d0d0d',
        'cinza-600': '#1a1a1a',
        'cinza-500': '#262626',
        'cinza-400': '#333333',
        'cinza-300': '#808080',
        'cinza-200': '#d9d9d9',
        'cinza-100': '#f2f2f2',
        danger: '#e25858',
      },
      lineHeight: {
        normal: '1.4',
      },
      spacing: {
        200: '200px',
      },
    },
  },
  plugins: [],
}
