var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
    proxy = require('express-http-proxy'),
    bodyParser = require('body-parser');

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

//var jsonParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }))

app.put('/api/v1/session/', function(req, res) {
    console.log('Login');
    console.log(req.body);
    res.send({status: 0, message: 'Ok'});
});

app.delete('/api/v1/session/', function(req, res) {
    console.log('Logout');
    console.log(req.body);
    res.send({status: 0, message: 'Ok'});
});

app.post('/api/v1/user/', function(req, res) {
    console.log('Register');
    console.log(req.body);
    res.send({status: 0, message: 'Ok'});
});

app.use('/proxy', proxy('http://vk.com', {
    forwardPath: function (req, res) {
        console.log(1234);
        return require('url').parse(req.url).path;
    }
}));
