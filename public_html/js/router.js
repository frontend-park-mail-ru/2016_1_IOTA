define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard',
    'views/registration',
    'models/session',
    'messaging_center'
], function(
    Backbone,
    GameView,
    LoginView,
    MainView,
    ScoreboardView,
    RegistrationView,
    SessionModel,
    messagingCenter
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
        }
    });

    return new Router();
});