define(function (require) {

    var Backbone = require('backbone'),
        GameView = require('views/game'),
        LoginView = require('views/login'),
        MainView = require('views/main'),
        ScoreboardView = require('views/scoreboard'),
        RegistrationView = require('views/registration'),
        UserModel = require('models/user'),
        Manager = require('views/manager'),
        MainAuthView = require('views/main_auth');

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

        initialize: function (session) {
            this.session = session;
            this.user = new UserModel();
            this.manager = new Manager();

            this.views = {
                game: new GameView(this.session, this.user),
                login: new LoginView(this.session, this.user),
                main: new MainView(this.session, this.user),
                scoreboard: new ScoreboardView(this.session, this.user),
                registration: new RegistrationView(this.session, this.user),
                mainAuth: new MainAuthView()
            };

            for (var view in this.views) {
                console.log(view);
                this.manager.addView(this.views[view]);
            }

            /*
            // TODO: To Key-Value storage and create view manager
            this.game = new GameView(this.session, this.user);
            this.login = new LoginView(this.session, this.user);
            this.main = new MainView(this.session, this.user);
            this.scoreboard = new ScoreboardView(this.session, this.user);
            this.registration = new RegistrationView(this.session, this.user);
            this.logout = new LogoutView(this.session, this.user);
            */

            this.listenTo(Backbone.Events, 'loginOk registerOk logoutOk logoutError', this.defaultActions);
        },

        defaultActions: function () {
            //console.log("Second: " + this.session.isAuth);
            this.navigate('/#');
            //this.main.show();
            if (this.session.isAuth) {
                this.views['mainAuth'].show();
            } else {
                this.views['main'].show();
            }
        },

        scoreboardAction: function () {
            //this.scoreboard.show();
            this.views['scoreboard'].show();
        },

        gameAction: function () {
            //this.game.show();
            this.views['game'].show();
        },

        loginAction: function () {
            //this.login.show();
            this.views['login'].show();
        },

        regAction: function () {
            //this.registration.show();
            this.views['registration'].show();
        },

        logoutAction: function () {
            //this.logout.show();
            //this.views['logout'].show();
            this.session.logout();
        }

    });

    return Router;

});