/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'amazon': {
          orange: '#ff9900',
          dark: '#131921',
          'dark-light': '#232f3e',
          'nav-hover': '#febd69',
        }
      }
    },
  },
  plugins: [],
}
