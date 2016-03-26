define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/login'),
        session = require('models/session');

    //noinspection UnnecessaryLocalVariableJS
    var LoginView = BaseView.extend({

        template: tmpl,

        initialize: function () {
            this.listenTo(Backbone.Events, 'loginError', this.loginError);
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.$alert = this.$('.js-alert');
            this.$('.js-submit').on('submit', {alert: this.$alert}, this.login);
        },

        login: function (event) {
            event.preventDefault();
            event.data.alert.html('');

            var regExp = /^[a-z0-9]+$/i;

            if (!regExp.test(this.login.value) || !regExp.test(this.password.value)) {
                event.data.alert.html('Логин и пароль должны содержать только цифры и латинские буквы');
                return;
            }

            if (this.password.value.length < 6) {
                event.data.alert.html('Пароль не должен быть короче 6 символов');
                return;
            }

            session.login(this.login.value, this.password.value);
        },

        loginError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return LoginView;

});