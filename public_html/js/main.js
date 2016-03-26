require.config({
    urlArgs: "_=" + (new Date()).getTime(),
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
        SessionModel = require('models/session');

    var session = new SessionModel();
    session.get();

    session.listenTo(Backbone.Events, 'authChecked', function (message) {
        console.log(message);
        var router = new Router(session);
        Backbone.history.start();
    });

});
