const pug = require('pug');
const path = require('path');
const sass = require('sass');

const template = pug.compileFile(path.join(__dirname, 'resume.pug'));
const scss = sass.compile(path.join(__dirname, 'style.scss'));

exports.render = resume => template({
    ...resume,
    css: scss.css,
    humanDate: (date) => (new Date(date)).toLocaleString([], {
        "month": "short",
        "year": "numeric",
    })
});
