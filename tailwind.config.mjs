/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        beige: {
          50: "#FEFEFB",
          100: "#FDFDF7",
          200: "#FAFAEF",
          300: "#F9F9EB",
          400: "#F7F7E3",
          500: "#F5F5DC",
          600: "#E0E094",
          700: "#CCCC4C",
          800: "#8F8F29",
          900: "#474714",
          950: "#24240A",
        },
        ground: {
          50: "#F8F5F1",
          100: "#F3EDE7",
          200: "#E8DBCF",
          300: "#DCC9B7",
          400: "#CFB59B",
          500: "#C4A484",
          600: "#AE8256",
          700: "#866340",
          800: "#5A422B",
          900: "#2D2115",
          950: "#150F0A",
        },
      },
      height: {
        banner: "calc(100vh)",
        "banner-lg": "calc(100vh - 5rem)",
      },
      width: {
        navbar: "calc(100% - 40px)",
      },
    },
  },
  variants: {
    extend: {
      height: ['group-hover'],
      display: ['group-hover'],
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
