const express = require('express')
const app = express()

app.get('/text', (req, res) => {
    res.type('text/plain');
    res.send('this is a test');
});

app.get('', (req, res) => res.send('Check out the "<a href="/text">plain text</a>" page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nServer is running on port 3000` + 
        `\nnavigate to http://localhost:${port}/text\n`));