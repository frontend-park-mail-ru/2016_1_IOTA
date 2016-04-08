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
        session = require('models/session'),
        HandModel = require('models/hand');

    var hand = new HandModel();
    hand.read();
    setTimeout(function () { hand.update(); }, 5000);

    session.read();

    session.listenTo(session, 'authChecked', function () {
        var router = new Router();
        Backbone.history.start();
    });

});
