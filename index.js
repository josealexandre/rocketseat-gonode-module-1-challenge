const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');

app.get('/', (req, res) => {
    return res.render('form');
});

app.post('/check', (req, res) => {
    const { age } = req.body;

    if (age < 18) {
        res.redirect(`/minor?age=${age}`);
    }

    res.redirect(`/major?age=${age}`);
});

const checkParam = (req, res, next) => {
    req.query.age ? next() : res.redirect('/');
};

app.get('/minor', checkParam, (req, res) => {
    res.render('minor', { age: req.query.age });
});

app.get('/major', checkParam, (req, res) => {
    res.render('major', { age: req.query.age });
});

app.listen(3000);
