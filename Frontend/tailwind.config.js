/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#7C5272',
        'nav-active': '#C4683D',
        primary: '#C4683D',
        'primary-light': '#D4795A',
        'card-bg': '#FEF0E8',
        'numpad-btn': '#F5E8DC',
        border: '#EDD5C5',
        'text-main': '#3D2416',
        'text-muted': '#9C7266',
        'text-faint': '#C4A090',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'system-ui', 'serif'],
      },
    },
  },
  plugins: [],
}
