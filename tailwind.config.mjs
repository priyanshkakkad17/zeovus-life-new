/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1F4015',
          DEFAULT: '#1A475C',
          light: '#15A859',
        },
        secondary: {
          DEFAULT: '#9CCD62',
          dark: '#B4BD62',
        },
        accent: {
          DEFAULT: '#FFD374',
          light: '#FFEF98',
          pale: '#FFF5D1',
        },
        neutral: {
          100: '#F8F8F8',
          200: '#EFEFEF',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'cert-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'draw-line': {
          from: { strokeDashoffset: '100' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'cert-scroll': 'cert-scroll 28s linear infinite',
        'float': 'float 5s ease-in-out infinite',
        'draw-line': 'draw-line 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [],
};