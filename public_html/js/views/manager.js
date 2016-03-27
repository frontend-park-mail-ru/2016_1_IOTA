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
        session = require('models/session');

    //noinspection UnnecessaryLocalVariableJS
    var Manager = Backbone.View.extend({

        el: '#page',

        views: {
            scoreboard: new ScoreboardView(),
            scoreboardAuth: new ScoreboardView(),
            game: new GameView(),
            gameAuth: new GameAuthView(),
            login: new LoginView(),
            loginAuth: new LoginAuthView(),
            reg: new RegView(),
            regAuth: new RegAuthView(),
            main: new MainView(),
            mainAuth: new MainAuthView()
        },

        initialize: function () {
            this.hideViews();
            for (var view in this.views) {
                //noinspection JSUnfilteredForInLoop
                this.$el.append(this.views[view].el);
                //noinspection JSUnfilteredForInLoop
                this.listenTo(this.views[view], 'show', this.hideViews);
            }
        },

        hideViews: function () {
            for (var view in this.views) {
                //noinspection JSUnfilteredForInLoop
                this.views[view].hide();
            }
        },

        show: function (viewName) {
            if (viewName === 'logout') {
                session.logout();
                return;
            }
            if (session.isAuth) {
                viewName += 'Auth';
            }
            this.views[viewName].show();
        }

    });

    return new Manager();

});