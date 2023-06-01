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
        modal: '#1c2648',
        grayish: '#aaa',
        offwhite: '#ddd',
        blackish: '#555',
        // blackish: '#333',
        ['custom-yellow']: '#FCD757',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
};
