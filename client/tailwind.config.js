/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#ffffff",

                    secondary: "#ff00ff",

                    accent: "#00ffff",

                    neutral: "#ff00ff",

                    "base-100": "#ffffff",

                    info: "#0000ff",

                    success: "#00ff00",

                    warning: "#00ff00",

                    error: "#ff0000",
                },
            },
        ],
    },

    plugins: [require("daisyui")],
};
