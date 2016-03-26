define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/registration'),
        user = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var RegistrationView = BaseView.extend({

        template: tmpl,

        initialize: function () {
            this.listenTo(Backbone.Events, 'registerError', this.registerError);
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.$alert = this.$('.js-alert');
            this.$('.js-submit').on('submit', {alert: this.$alert}, this.register);
        },

        register: function (event) {
            event.preventDefault();
            event.data.alert.html('');

            var regExp = /^[a-z0-9]+$/i;

            if (!regExp.test(this.login.value) || !regExp.test(this.password.value)) {
                event.data.alert.html('Логин и пароль должны содержать только цифры и латинские буквы');
                return;
            }

            if (this.password.value !== this.confirm_password.value) {
                event.data.alert.html('Пароли не совпадают');
                return;
            }

            if (this.password.value.length < 6) {
                event.data.alert.html('Пароль не должен быть короче 6 символов');
                return;
            }

            user.create(this.login.value, this.password.value, this.email.value);
        },

        registerError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return RegistrationView;

});