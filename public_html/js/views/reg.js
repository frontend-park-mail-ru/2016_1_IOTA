define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/registration'),
        user = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var RegistrationView = BaseView.extend({

        template: tmpl,

        events: {
            'submit .js-submit': 'register'
        },

        initialize: function () {
            this.listenTo(user, 'registerError', this.registerError);
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.$alert = this.$('.js-alert');
        },

        register: function (event) {
            event.preventDefault();
            this.$alert.html('');

            var regExp = /^[a-z0-9]+$/i;

            if (!regExp.test(event.target.login.value) || !regExp.test(event.target.password.value)) {
                this.$alert.html('Логин и пароль должны содержать только цифры и латинские буквы');
                return;
            }

            if (event.target.password.value !== event.target.confirm_password.value) {
                this.$alert.html('Пароли не совпадают');
                return;
            }

            if (event.target.password.value.length < 6) {
                this.$alert.html('Пароль не должен быть короче 6 символов');
                return;
            }

            user.create(event.target.login.value, event.target.password.value, event.target.email.value);
        },

        registerError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return RegistrationView;

});