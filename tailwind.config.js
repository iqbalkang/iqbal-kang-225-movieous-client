/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        body: '#0E1428',
        background: '#101419',
        accent: '#823038',
        ['custom-yellow']: '#FCD757',
      },
    },
  },
  plugins: [],
}
