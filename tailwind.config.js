// Gera assets/css/tailwind.css com apenas as classes usadas nos livros.
// Rode `npm run build:css` sempre que adicionar classes Tailwind novas em qualquer HTML.
module.exports = {
    content: ['./*.html', './*/parte-*.html', './assets/js/**/*.js'],
    theme: { extend: {} },
    plugins: []
};
