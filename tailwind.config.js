/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            dropShadow: {
                banner: '0px 3px 15px rgba(35, 35, 35, 0.2)',
            },
        },
        colors: {
            gray: {
                200: '#f7f7f7',
                300: '#E6E6E6',
                800: '#505050',
                900: '#383838',
            },
        },
        fontSize: {
            16: '16px',
            14: '14px',
        },
    },
    plugins: [],
};
