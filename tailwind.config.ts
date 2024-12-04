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
        background: "#FAEDC8",
        yellow: {
          500: "#FF9000",
          600: "#FFAC5E",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
