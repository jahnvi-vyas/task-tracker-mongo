module.exports = {
    content: [
        "./public/index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                app: {
                    background: "#0b1120",
                    surface: "#111827",
                    elevated: "#172033",
                    border: "#263247"
                }
            },
            boxShadow: {
                card: "0 8px 30px rgba(0, 0, 0, 0.18)"
            }
        }
    },
    plugins: []
};