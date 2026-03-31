/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#1E1B3A',
        'nav-active': '#2C3BDB',
        primary: '#2563EB',
        'primary-light': '#3B82F6',
        'card-bg': '#F4F4F5',
        'numpad-btn': '#F0F0F0',
        border: '#E5E5E5',
        'text-main': '#111111',
        'text-muted': '#9CA3AF',
        'text-faint': '#BBBBBB',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'system-ui', 'sans-serif'],
        heading: ['Rubik', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
