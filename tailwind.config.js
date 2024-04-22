/** @type {import('tailwindcss').Config} */
const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

export default {
  // Specify paths to components and pages where Tailwind scans for class names
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,vue}",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      // Extend default Tailwind theme with custom colors
      colors: {
        mnBlue: "#3E517A",
        carolinaBlue: "#39A0ED",
        honeyYellow: "#F7B32B",
        forestGreen: "#6BA368",
        culturedWhite: "#F9F8F8",
        blueGrey: "#5885AF",
        midnightBlue: "#41729F",
        darkBlue: "#274472",
        babyBlue: "#C3E0E5",
        wendyBlue: "#EEF7FC",
        gainsboro: "#E2DED0",
      },
    },
  },
  plugins: [
    // Enable aspect-ratio plugin for managing aspect ratios
    require("@tailwindcss/aspect-ratio"),
    // Enable typography plugin for styling typography elements
    require("@tailwindcss/typography"),
    iconsPlugin({
      collections: getIconCollections(["mdi", "lucide", "flag", "flagpack"]),
    }),
  ],
};
