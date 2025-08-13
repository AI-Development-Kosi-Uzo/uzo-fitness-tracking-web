/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        border: 'var(--color-border)'
      },
      fontFamily: {
        sans: ['var(--font-sans)']
      }
    },
  },
  plugins: [],
}

