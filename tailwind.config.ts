import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["QuiapoFree"],
        primary: ["Poppins"],
      },
      colors: {
        background: "#F2D9B0",
        yellow: {
          500: "#FF9000",
          600: "#FFAC5E",
        },
      },
      rotate: {
        "135": "135deg",
      },
    },
  },
  plugins: [],
} satisfies Config;
