/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  trailingComma: "es5",
  tabWidth: 2,
  singleQuote: false,
};

export default config;
