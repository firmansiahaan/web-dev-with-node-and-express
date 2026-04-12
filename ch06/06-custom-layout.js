const express = require('express');
const { title } = require('node:process');
const { useLayoutEffect } = require('react');
const expressHandlebars = require('express-handlebars').create({ defaultLayout: 'custom' });
const port = process.env.PORT || 3000

const app = express();

app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

// see the views/error.hbs file for the contents of this view
app.get('/custom-layout', (req, res) => res.status(500).render('custom-layout'));

app.get('', (req, res) => res.send('Check out the "<a href="/custom-layout">custom layout</a>" page!'))

app.listen(3000, () => {
    app.listen(port, () => console.log(`\nServer is running on port 3000` + 
        `\nnavigate to http://localhost:${port}/custom-layout\n`));
});