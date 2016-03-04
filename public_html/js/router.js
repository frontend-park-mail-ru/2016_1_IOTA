define(function (require) {

    var Backbone = require('backbone');
    var GameView = require('views/game');
    var LoginView = require('views/login');
    var MainView = require('views/main');
    var ScoreboardView = require('views/scoreboard');
    var RegistrationView = require('views/registration');
    var SessionModel = require('models/session');
    var messagingCenter = require('messaging_center');

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
            console.log("init");
            this.session = new SessionModel();

            this.game = new GameView(this.session);
            this.login = new LoginView(this.session);
            this.main = new MainView(this.session);
            this.scoreboard = new ScoreboardView(this.session);
            this.registration = new RegistrationView(this.session);

            this.listenTo(messagingCenter, 'loginOk', this.defaultActions);
            this.listenTo(messagingCenter, 'registerOk', this.defaultActions);
        },

        defaultActions: function () {
            this.navigate('/#');
            this.main.show();
        },

        scoreboardAction: function () {
            this.scoreboard.show();
        },

        gameAction: function () {
            this.game.show();
        },

        loginAction: function () {
            this.login.show();
        },

        regAction: function () {
            this.registration.show();
        },

        logoutAction: function () {
            this.session.logout();
            this.defaultActions();
        }

    });

    return Router;

});