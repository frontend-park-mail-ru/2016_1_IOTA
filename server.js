var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
    proxy = require('express-http-proxy');

var HOSTNAME = 'localhost',
    PORT = 8080,
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

app.use('/api', proxy('http://iota.ian.corp.cdecl.ru:8081/', {
    forwardPath: function (req, res) {
        var url = '/api' + require('url').parse(req.url).path;
        console.log('Proxy: ' + url);
        return url;
    }
}));
