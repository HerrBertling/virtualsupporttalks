/** @type {import('tailwindcss').Config} */
const headlineFonts = [
  "Poppins",
  "Roboto",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Helvetica",
  "Arial",
  "sans-serif",
];

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  allowList: ["h-4", "w-4", "mr-2"],
  theme: {
    fontFamily: {
      sans: [
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      headline: headlineFonts.join(", "),
    },
    extend: {
      colors: {
        vsp: {
          50: "#fefefa",
          100: "#f3fbdb",
          200: "#dcf292",
          300: "#c2e944",
          400: "#aad619",
          500: "#9cc317",
          600: "#8db215",
          700: "#7fa013",
          800: "#698410",
          900: "#50640c",
        },
      },
      gridTemplateColumns: {
        coachgrid: "repeat(auto-fill, minmax(320px, 1fr))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: headlineFonts.join(", "),
              fontWeight: "bold",
            },
          },
        },
        white: {
          css: {
            "--tw-prose-body": theme.colors.white,
            "--tw-prose-headings": theme.colors.white,
            "--tw-prose-lead": theme.colors.white,
            "--tw-prose-links": theme.colors.white,
            "--tw-prose-bold": theme.colors.white,
            "--tw-prose-counters": theme.colors.white,
            "--tw-prose-bullets": theme.colors.white,
            "--tw-prose-hr": theme.colors.white,
            "--tw-prose-quotes": theme.colors.white,
            "--tw-prose-quote-borders": theme.colors.white,
            "--tw-prose-captions": theme.colors.white,
            "--tw-prose-code": theme.colors.white,
            "--tw-prose-pre-code": theme.colors.white,
            "--tw-prose-pre-bg": theme.colors.white,
            "--tw-prose-th-borders": theme.colors.white,
            "--tw-prose-td-borders": theme.colors.white,
            "--tw-prose-invert-body": theme.colors.white,
            "--tw-prose-invert-headings": theme.colors.white,
            "--tw-prose-invert-lead": theme.colors.white,
            "--tw-prose-invert-links": theme.colors.white,
            "--tw-prose-invert-bold": theme.colors.white,
            "--tw-prose-invert-counters": theme.colors.white,
            "--tw-prose-invert-bullets": theme.colors.white,
            "--tw-prose-invert-hr": theme.colors.white,
            "--tw-prose-invert-quotes": theme.colors.white,
            "--tw-prose-invert-quote-borders": theme.colors.white,
            "--tw-prose-invert-captions": theme.colors.white,
            "--tw-prose-invert-code": theme.colors.white,
            "--tw-prose-invert-pre-code": theme.colors.white,
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme.colors.white,
            "--tw-prose-invert-td-borders": theme.colors.white,
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
