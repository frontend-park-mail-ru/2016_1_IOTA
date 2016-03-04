define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard',
    'views/registration',
    'models/session',
    'messaging_center',
    'models/user'
], function(
    Backbone,
    GameView,
    LoginView,
    MainView,
    ScoreboardView,
    RegistrationView,
    SessionModel,
    messagingCenter,
    UserModel
) {

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

            this.game = new GameView(this.session, this.user);
            this.login = new LoginView(this.session, this.user);
            this.main = new MainView(this.session, this.user);
            this.scoreboard = new ScoreboardView(this.session, this.user);
            this.registration = new RegistrationView(this.session, this.user);

            this.listenTo(messagingCenter, 'loginOk', this.defaultActions);
            this.listenTo(messagingCenter, 'registerOk', this.defaultActions);
        },
        defaultActions: function () {
            console.log("Second: " + this.session.isAuth);
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