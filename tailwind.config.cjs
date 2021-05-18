module.exports = {
    mode: "jit",
    purge: [
        "./src/**/*.{html,js,svelte,ts}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'display': ['"Iceland"', 'cursive']
            }
        },
    },
    plugins: [],
};