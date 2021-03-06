const colors = require("./styles/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  content: ["{components,pages}/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: colors.surfaces.surface,
    }),
    container: {
      padding: "1rem",
    },
    extend: {
      colors: {
        ...colors,
        primary: {
          ...colors.primary,
          DEFAULT: "#00282B",
        },
        secondary: {
          ...colors.secondary,
          DEFAULT: "#D7B57D",
        },
        tertiary: {
          ...colors.tertiary,
          DEFAULT: "#545451",
        },
      },
      fontFamily: {
        cera: ["Cera Pro", ...defaultTheme.fontFamily.sans],
        minimal: ["FC Minimal", ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
        screens: {
          xl: "1152px",
        },
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1600px",
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5,
      },
      animation: {
        fadeIn: "fadeIn 5s",
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
