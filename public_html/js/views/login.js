define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/login'),
        session = require('models/session');

    //noinspection UnnecessaryLocalVariableJS
    var LoginView = BaseView.extend({

        template: tmpl,

        events: {
            'submit .js-submit': 'login'
        },

        initialize: function () {
            this.listenTo(Backbone.Events, 'loginError', this.loginError);
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.$alert = this.$('.js-alert');
        },

        login: function (event) {
            event.preventDefault();
            this.$alert.html('');

            var regExp = /^[a-z0-9]+$/i;

            if (!regExp.test(event.target.login.value) || !regExp.test(event.target.password.value)) {
                this.$alert.html('Логин и пароль должны содержать только цифры и латинские буквы');
                return;
            }

            if (event.target.password.value.length < 6) {
                this.$alert.html('Пароль не должен быть короче 6 символов');
                return;
            }

            session.login(event.target.login.value, event.target.password.value);
        },

        loginError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return LoginView;

});