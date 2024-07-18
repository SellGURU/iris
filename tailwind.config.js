/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
                '10xl': [
                    '0px 0px 17px 5px rgba(0, 0, 0, 0.1)'
                ]
            },
            colors: {
                "primary-color": "#544BF0",

                "secondary-color": "#253343",

                "placeholder-color": "#92A7C1",

                "input-color": "#F5F7FA",
            },            
        },
    },
    plugins: [],
};
