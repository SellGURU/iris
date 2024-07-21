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
            animation: {
                'vote': 'vote 1s ease-in-out ',
                'zooming': 'zooming 1s ease-in-out ',
                'comeFromLeft': 'comeFromLeft 1s ease-in-out ',
            },
            keyframes: {
                vote: {
                    '0%': {
                        transform: 'translateY(-300px)'
                    },
                    '100%': {
                        transform: 'translateY(0px)'
                    },
                },
                zooming: {
                    '0%': {
                        transform: 'scale(0,0)'
                    },
                    '100%': {
                        transform: 'scale(1,1)'
                    },
                } ,
                comeFromLeft: {
                    '0%': {
                        transform: 'translate(500px,0px)'
                    },
                    '100%': {
                        transform: 'translate(0px,0px)'
                    },
                }                                
            }                  
        },
    },
    plugins: [],
};
