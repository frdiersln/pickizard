import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
      },
      fontFamily: {
        'kumar-one': ['var(--font-kumar-one)'],
        'lora': ['var(--font-lora)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
