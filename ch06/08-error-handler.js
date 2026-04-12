const express = require('express')
const expressHandlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const app = express()
const port = process.env.port || 3000

// the following is needed to use views
app.engine('handlebars', expressHandlebars.engine);
app.set('view engine', 'handlebars');

app.get('/bad-bad-not-good', (req, res) => {
    // we're going to simulate something bad happening in your code....
    throw new Error("that didn't go well!")
});

app.get('', (req, res) => res.render('08-click-here'));

app.use((err, req, res, next) => {
    console.error('** SERVER ERROR: ' + err.message)
    res.status(500).render('08-error', { message: "you shouldn't have clicked that!" })
});

app.listen(port, () => {
    console.log(`\nnavigate to http://localhost:${port}\n`);
});