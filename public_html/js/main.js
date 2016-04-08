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
        GameModel = require('models/game');

    var game = new GameModel();
    game.read();
    setTimeout(function () { game.update(); }, 5000);

    session.read();

    session.listenTo(session, 'authChecked', function () {
        var router = new Router();
        Backbone.history.start();
    });

});
