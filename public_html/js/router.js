define(function (require) {

    var Backbone = require('backbone'),
        ScoreboardView = require('views/scoreboard'),
        GameView = require('views/game'),
        GameAuthView = require('views/game_auth'),
        LoginView = require('views/login'),
        LoginAuthView = require('views/login_auth'),
        RegView = require('views/reg'),
        RegAuthView = require('views/reg_auth'),
        MainView = require('views/main'),
        MainAuthView = require('views/main_auth'),
        ViewManager = require('views/manager'),
        session = require('models/session'),
        user = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var Router = Backbone.Router.extend({

        views: {
            scoreboard: new ScoreboardView(),
            scoreboardAuth: new ScoreboardView(),
            game: new GameAuthView(),
            gameAuth: new GameAuthView(),
            login: new LoginView(),
            loginAuth: new LoginAuthView(),
            reg: new RegView(),
            regAuth: new RegAuthView(),
            main: new MainView(),
            mainAuth: new MainAuthView()
        },

        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'regAction',
            'logout': 'logoutAction',
            '*default': 'defaultActions'
        },

        initialize: function () {
            this.viewManager = new ViewManager(this.views);
            this.listenTo(session, 'loginOk logoutOk logoutError', this.defaultActions);
            this.listenTo(user, 'registerOk', this.defaultActions);
        },

        defaultActions: function () {
            this.navigate('/#');
            this.viewManager.show(session.get('isAuth') ? 'mainAuth' : 'main');
        },

        scoreboardAction: function () {
            this.viewManager.show('scoreboard');
        },

        gameAction: function () {
            this.viewManager.show(session.get('isAuth') ? 'gameAuth' : 'game');
        },

        loginAction: function () {
            this.viewManager.show(session.get('isAuth') ? 'loginAuth' : 'login');
        },

        regAction: function () {
            this.viewManager.show(session.get('isAuth') ? 'regAuth' : 'reg');
        },

        logoutAction: function () {
            session.logout();
        }

    });

    return Router;

});