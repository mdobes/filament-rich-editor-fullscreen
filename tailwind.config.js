module.exports = {
    content: [
        './src/**/*.php',
        './resources/**/*.css',
        './resources/**/*.js',
        './resources/views/**/*.blade.php',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
