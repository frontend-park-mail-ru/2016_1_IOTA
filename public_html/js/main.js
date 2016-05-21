require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define(function (require) {

    var Backbone = require('backbone'),
        Router = require('router'),
        session = require('models/session'),
        socket = require('ws');

    session.read();
    socket.send('hello');

    session.listenTo(session, 'authChecked', function () {
        var router = new Router();
        Backbone.history.start();
    });

});
