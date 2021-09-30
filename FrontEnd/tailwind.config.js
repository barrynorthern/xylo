module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
        fontFamily: {
            sans: ['MarkPro', 'sans-serif'],
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
