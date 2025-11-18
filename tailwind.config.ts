import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './frontend/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      primary: '#044faa',
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#0A4490',
        secondary: '#CD1432',
        'primary-light': '#f2f6fa',
        'secondary-light': '#fae9ed',
      },
      maxWidth: {
        '8xl': '96rem',
      },
      borderWidth: {
        6: '6px',
      },
    },
  },
  plugins: [],
} satisfies Config
