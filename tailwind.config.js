/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/*.{js,jsx}'
  ],
  theme: {
    extend: {
      zIndex: {
        '1000': '1000',
        '2000': '2000',
        '3000': '3000',
        '5000': '5000'
      },
      colors: {
        netflixMsgColor: 'rgb(235, 57, 66)',
        netflixColor: '#e50914',
        bgLogin: 'rgba(0,0,0,.75)',
        inputBg: '#333333',
        inputPH: '#8C8C8C',
        errorText: '#E87C03',
        loginFormText: '#737373',
        buttonBg: '#6D6D6EB3',
        transparentBg: 'rgba(0,0,0,.4)',
      },
    },
  },
  plugins: [],
}

