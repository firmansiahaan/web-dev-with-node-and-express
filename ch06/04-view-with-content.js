const express = require('express');
const { title } = require('node:process');
const expressHandlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const cookieParser = require('cookie-parser');
const session = require('express-session');
const catNames = require('cat-names');
const port = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

// the following is needed for cookie support
app.use(cookieParser());

// the following is needed for session support
app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' }));

// see the views/greeting.hbs file for the contents of this view
app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: 'Hello esteemed programmer!',
        style: req.query.style,
        userid: req.cookies.userid,
        username: req.session.username
    });
});

app.get('/set-random-userid', (req, res) => {
    res.cookie('userid', (Math.random()*10000).toFixed(0));
    res.redirect('/greeting');
});

app.get('/set-random-username', (req, res) => {
    req.session.username = catNames.randomCatName();
    res.redirect('/greeting');
});

app.get('', (req, res) => res.send('Check out our <a href="/greeting">greeting</a> page!'));

app.listen(3000, () => {
    app.listen(port, () => console.log(`\nServer is running on port 3000` + 
        `\nnavigate to http://localhost:${port}/greeting\n`))
});