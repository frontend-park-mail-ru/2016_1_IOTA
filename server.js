var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
    proxy = require('express-http-proxy'),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json();

var HOSTNAME = 'localhost',
    PORT = 8000,
    PUBLIC_DIR = __dirname + '/public_html';

var count = 0;

app.use(function (req, res, next) {
    // Здесь нужно написать журналирование в формате
    // (журналирование - вывод в консоль)
    // [время] [номер запроса по счету]
    console.log('[%s] [%s]', (new Date()).toLocaleString(), count++);
    next();
});

app
    .use('/', express.static(PUBLIC_DIR))
    .use(errorHandler());

app.listen(PORT, function () {
    console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

app.get('/game/', function (req, res, next) {
    res.send({
        cards: [
            {image: 'img1'},
            {image: 'img2'},
            {image: 'img3'},
            {image: 'img4'}
        ],
        table: [
            {image: 'img1', x: 1, y: 1, allowedImages: ['super']},
            {image: '', x: 2, y: 2, allowedImages: ['super', 'img2']},
            {image: 'img3', x: 3, y: 3, allowedImages: []}
        ]
    });
    next();
});

app.post('/game/', jsonParser, function (req, res, next) {
    console.log(req.body);
    next();
});

app.use('/api', proxy('http://localhost:8080/', {
    forwardPath: function (req, res) {
        var url = '/api' + require('url').parse(req.url).path;
        console.log('Proxy: ' + url);
        return url;
    }
}));
