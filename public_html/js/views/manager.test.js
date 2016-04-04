define(function (require) {

    QUnit.module("views/manager");

    QUnit.test("ViewManager - экземпляр Backbone.View", function () {

        var ViewManager = require('./manager'),
            viewManager = new ViewManager();

        QUnit.ok(viewManager instanceof Backbone.View);

    });

    QUnit.test("ViewManager - тестирование логики", function () {

        var ViewManager = require('./manager'),
            LoginView = require('./login'),
            RegView = require('./reg');

        var views = {
                login: new LoginView(),
                reg: new RegView()
            },
            viewManager = new ViewManager(views);

        QUnit.equal(views['login'].$el.css('display') === 'none', true);
        QUnit.equal(views['reg'].$el.css('display') === 'none', true);

        views['login'].show();

        QUnit.equal(views['login'].$el.css('display') === 'none', false);
        QUnit.equal(views['reg'].$el.css('display') === 'none', true);

        views['reg'].show();

        QUnit.equal(views['login'].$el.css('display') === 'none', true);
        QUnit.equal(views['reg'].$el.css('display') === 'none', false);

    });

});
