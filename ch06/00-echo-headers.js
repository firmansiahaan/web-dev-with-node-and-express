const express = require('express');
const app = express();

app.get('/headers', (req, res) => {
    res.type('text/plain');
    // res.send(JSON.stringify(req.headers, null, 2));
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    res.send(headers);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});