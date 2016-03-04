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

define([
    'backbone',
    'router',
    'models/session',
    'messaging_center'
], function(
    Backbone,
    Router,
    SessionModel,
    messagingCenter
) {

    var session = new SessionModel();
    session.get();

    session.listenTo(messagingCenter, 'authChecked', function (message) {
        console.log(message);
        var router = new Router(session);
        Backbone.history.start();
    });

});
