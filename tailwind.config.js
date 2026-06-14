/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"MS Sans Serif"', "Tahoma", "Geneva", "Verdana", "sans-serif"],
        serif: ['"Times New Roman"', "Times", "serif"],
        mono: ['"Courier New"', "Courier", "monospace"],
      },
      colors: {
        xp: {
          blue: "#245EDC",
          blueDark: "#0A246A",
          gray: "#ECE9D8",
          grayDark: "#ACA899",
          green: "#0AAA0A",
          taskbar: "#235AD1",
        },
        abrc: {
          cream: "#F5EFE0",
          yellow: "#F5D547",
          terracotta: "#D94F3D",
          lime: "#B8D96E",
          plum: "#2D1B33",
          sky: "#8BBEE8",
        },
      },
      boxShadow: {
        win: "inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf",
        winInset:
          "inset 1px 1px 0 #0a0a0a, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf",
        btn: "inset -1px -1px 0 #0a0a0a, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf",
        btnPressed:
          "inset 1px 1px 0 #0a0a0a, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf",
      },
    },
  },
  plugins: [],
};
