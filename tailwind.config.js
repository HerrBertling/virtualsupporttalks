module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontFamily: {
      sans: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      headline: [
        'Poppins',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        vsp: {
          500: '#9cc317',
        },
      },
      gridTemplateColumns: {
        coachgrid: 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      typography: {
        DEFAULT: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: [
                'Poppins',
                'Roboto',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Helvetica',
                'Arial',
                'sans-serif',
              ],
              fontWeight: 'bold',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
