const express = require('express');
const { title } = require('node:process');
const expressHandlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const port = process.env.PORT || 3000

const app = express();

app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

// see the views/error.hbs file for the contents of this view
app.get('/error', (req, res) => res.status(500).render('error', {title:'Error'}))

app.get('', (req, res) => res.send('Check out our <a href="/error">error</a> page!'))

app.listen(3000, () => {
    app.listen(port, () => console.log(`\nServer is running on port 3000` + 
        `\nnavigate to http://localhost:${port}/error\n`))
});