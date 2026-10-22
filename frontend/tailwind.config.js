/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        da: {
          primary: 'rgb(var(--da-primary-rgb) / <alpha-value>)',
          'primary-hover': 'rgb(var(--da-primary-hover-rgb) / <alpha-value>)',
          bg: 'rgb(var(--da-bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--da-surface-rgb) / <alpha-value>)',
          text: 'rgb(var(--da-text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--da-muted-rgb) / <alpha-value>)',
          border: 'rgb(var(--da-border-rgb) / <alpha-value>)',
          card: 'rgb(var(--da-card-rgb) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
