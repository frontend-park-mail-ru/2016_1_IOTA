define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard'
], function(
    Backbone,
    GameView,
    LoginView,
    MainView,
    ScoreboardView
) {

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },
        initialize: function () {
            this.game = new GameView();
            this.login = new LoginView();
            this.main = new MainView();
            this.scoreboard = new ScoreboardView();
        },
        defaultActions: function () {
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
        }
    });

    return new Router();
});