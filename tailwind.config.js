/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#1C1C1C",
        "gray-0": "#505050",
        "gray-1": "#8B96A5",
        "gray-2": "#8B96A5",
        "gray-3": "#DEE2E7",
        "gray-4": "#EFF2F4",
        "gray-5": "#F7FAFC",
        "primary": "#0D6EFD",
        "green": "#0D6EFD",
        "orange": "#C3FFCB",
        "red": "#FA3434",
      },
    },
  },
  plugins: [],
}