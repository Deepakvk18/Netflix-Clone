/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflixMsgColor: 'rgb(235, 57, 66)',
        netflixColor: '#e50914',
        bgLogin: 'rgba(0,0,0,.75)',
        inputBg: '#333333',
        inputPH: '#8C8C8C',
        errorText: '#E87C03',
        loginFormText: '#737373',
        buttonBg: '#6D6D6EB3',
      },
    },
  },
  plugins: [],
}

