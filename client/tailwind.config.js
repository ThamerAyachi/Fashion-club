module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00E58B',
        secondary: '#00b66d'
      }
    },
    fontFamily: {
      body: ['Open Sans'],
    }
  },
  variants: {
    extend: {
      display: ['group-focus']
    },
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}
