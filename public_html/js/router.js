define(function (require) {

    var Backbone = require('backbone'),
        session = require('models/session'),
        user = require('models/user'),
        viewManager = require('views/manager');

    //noinspection UnnecessaryLocalVariableJS
    var Router = Backbone.Router.extend({

        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'regAction',
            'logout': 'logoutAction',
            '*default': 'defaultActions'
        },

        initialize: function () {
            this.listenTo(session, 'loginOk logoutOk logoutError', this.defaultActions);
            this.listenTo(user, 'registerOk', this.defaultActions);
        },

        defaultActions: function () {
            this.navigate('/#');
            viewManager.show('main');
        },

        scoreboardAction: function () {
            viewManager.show('scoreboard');
        },

        gameAction: function () {
            viewManager.show('game');
        },

        loginAction: function () {
            viewManager.show('login');
        },

        regAction: function () {
            viewManager.show('reg');
        },

        logoutAction: function () {
            viewManager.show('logout');
        }

    });

    return Router;

});