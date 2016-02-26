define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard',
    'views/registration'
], function(
    Backbone,
    GameView,
    LoginView,
    MainView,
    ScoreboardView,
    RegistrationView
) {

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'regAction',
            '*default': 'defaultActions'
        },
        initialize: function () {
            this.game = new GameView();
            this.login = new LoginView();
            this.main = new MainView();
            this.scoreboard = new ScoreboardView();
            this.registration = new RegistrationView();
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
        },
        regAction: function () {
            this.registration.show();
        }
    });

    return new Router();
});