var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database');

var PORT = 8080;

var app = express();

app.use(bodyParser.json());

app.get('/*', function(req, res, next) {
    db.find({}, function(err, messages) {
        if (err) return next(err);
        return res.json(messages);
    });
});

app.post('/*', function(req, res, next) {
    if (typeof req.body.username !== 'string')
        return res.status(400).send('Missing username');
    if (req.body.username.length > 127)
        return res.status(400).send('Username too long');
    if (typeof req.body.text !== 'string')
        return res.status(400).send('Missing text');
    if (req.body.text.length > 255)
        return res.status(400).send('Text too long');

    db.insert(req.body, function(err, message) {
        if (err) return next(err);
        return res.sendStatus(200);
    });
});

// error handler
app.use(function(err, req, res, next) {
    return res.status(err.status || 500).send(err.message || '');
});

var server = app.listen(PORT);
console.log('Listening at http://localhost:%s', server.address().port);

module.exports = app;
