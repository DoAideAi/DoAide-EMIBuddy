/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0a0a',
          primary: '#3B82F6',
          'primary-hover': '#2563EB',
          secondary: '#10B981',
          card: '#141414',
          border: '#2a2a2a',
          muted: '#888888',
        },
      },
    },
  },
  plugins: [],
}
