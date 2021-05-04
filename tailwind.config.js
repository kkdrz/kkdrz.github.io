module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '128': '42rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}