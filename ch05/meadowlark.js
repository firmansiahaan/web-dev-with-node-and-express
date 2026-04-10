const handle = require('handlebars');
const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const app = express();
const port = process.env.PORT || 3000;
const handlers = require('./lib/handlers');
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', handlers.home);
app.get('/about', handlers.about);
// custom 404 page
app.use(handlers.notFound);
// custom 500 page
app.use(handlers.serverError);

if(require.main === module) {
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.' )
        })
    } else {
        module.exports = app
}