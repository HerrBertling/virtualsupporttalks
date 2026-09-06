/** @type {import('tailwindcss').Config} */

/*
 * Visual alignment with the Fürstenberg Foundation (fuerstenberg-foundation.de):
 * their type scale, shape and spacing language, with our colours and — for now —
 * our existing typefaces. Adopting their face (Dosis) is deferred: it ships no
 * Cyrillic subset, so the ru/uk locales need a decision first.
 */
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

const bodyFonts = [
  "Roboto",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Helvetica",
  "Arial",
  "sans-serif",
];

// Foundation heading scale, made fluid so it survives small screens.
const scale = {
  eyebrow: "1rem", // 16px, uppercase, tracked out
  h1: "clamp(2.5rem, 1.6rem + 4.5vw, 4.125rem)", // → 66px
  h2: "clamp(2rem, 1.5rem + 2.5vw, 2.625rem)", // → 42px
  h3: "clamp(1.5rem, 1.3rem + 1vw, 1.75rem)", // → 28px
  body: "1.125rem", // 18px
};

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  allowList: ["h-4", "w-4", "mr-2"],
  theme: {
    fontFamily: {
      sans: bodyFonts,
      headline: headlineFonts.join(", "),
    },
    extend: {
      colors: {
        vsp: {
          // Foundation-style tinted section band, at our hue instead of theirs.
          25: "#f9fbf0",
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
      borderRadius: {
        // Their soft-corner language: 33px on media/panels, 20px on smaller cards.
        card: "20px",
        panel: "33px",
      },
      boxShadow: {
        // They tint shadows with the brand hue rather than using neutral grey.
        vsp: "0 4px 16px 0 rgba(156, 195, 23, 0.12)",
        "vsp-lg": "0 8px 32px 0 rgba(156, 195, 23, 0.16)",
      },
      letterSpacing: {
        eyebrow: "3px",
        button: "1px",
        headline: "-0.03em",
      },
      gridTemplateColumns: {
        coachgrid: "repeat(auto-fill, minmax(320px, 1fr))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: scale.body,
            lineHeight: "1.4",
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: headlineFonts.join(", "),
              fontWeight: "bold",
            },
            h1: {
              fontSize: scale.h1,
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
            },
            h2: {
              fontSize: scale.h2,
              lineHeight: "1.4",
            },
            h3: {
              fontSize: scale.h3,
              lineHeight: "1.4",
            },
            // h6 is the Foundation's "eyebrow": a short tracked-out label above a
            // heading. Editors get it by marking a line as Heading 6 in Contentful —
            // no content-model change needed.
            h6: {
              fontSize: scale.eyebrow,
              lineHeight: "1.4",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#7fa013",
              marginBottom: "0.5em",
            },
            "h6 + h1, h6 + h2, h6 + h3": {
              marginTop: "0",
            },
          },
        },
        lg: {
          css: {
            fontSize: scale.body,
            lineHeight: "1.4",
            h1: { fontSize: scale.h1, lineHeight: "1.15" },
            h2: { fontSize: scale.h2, lineHeight: "1.4" },
            h3: { fontSize: scale.h3, lineHeight: "1.4" },
            h6: { fontSize: scale.eyebrow, lineHeight: "1.4" },
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
            h6: { color: theme.colors.white },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
