/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'max':'320px','max':'575px'},
      // => @media (min-width: 640px) { ... }

      'md': {'min':'576px','max':'768px'},
      // => @media (min-width: 768px) { ... }

      'lg': {'min':'769px','max':'992px'},
      // => @media (min-width: 1024px) { ... }
      'xl': {'min':'993px','max':'1024px'},
    },
  },
  plugins: [],
}
