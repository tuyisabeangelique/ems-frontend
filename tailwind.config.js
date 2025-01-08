/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include your HTML file (if it's in the root)
    "./src/**/*.{html,jsx}", // Include all HTML and JS files inside the src directory
    "./public/**/*.{html,jsx}", // If you have a public directory with HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
