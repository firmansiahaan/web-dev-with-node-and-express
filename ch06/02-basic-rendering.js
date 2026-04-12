const express = require('express');
const expressHandlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const port = process.env.PORT || 3000

const app = express();

app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.get('', (req, res) => res.send('Check out our "<a href="/about">About</a>" page!'))

app.listen(3000, () => {
    app.listen(port, () => console.log(`\nServer is running on port 3000` + 
        `\nnavigate to http://localhost:${port}/about\n`))
});