/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--foreground)",
        foreground: "var(--foreground)",
        baseBackground: "#F6E9E0",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shake: {
          "0%, 100%": { transform: "rotate(0)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 2.9s ease-in-out infinite",
        shake1: "shake 0.25s ease-in-out infinite",
        shake2: "shake 0.5s ease-in-out infinite",
        shake3: "shake 0.8s ease-in-out infinite",
        shake4: "shake 1.2s ease-in-out infinite",
        shake5: "shake 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  // tailwind.config.js
};
