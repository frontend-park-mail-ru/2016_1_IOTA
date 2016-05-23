define(function (require) {

    var Backbone = require('backbone'),
        BaseView = require('views/base'),
        tmpl = require('tmpl/reg'),
        user = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var RegistrationView = BaseView.extend({

        template: tmpl,

        events: {
            'submit .js-submit': 'register'
        },

        initialize: function () {
            this.listenTo(user, 'registerOk', this.registerOk);
            this.listenTo(user, 'registerError', this.registerError);
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.$alert = this.$('.js-alert');
            this.$login = this.$('.js-login');
            this.$email = this.$('.js-email');
            this.$password = this.$('.js-password');
            this.$password2 = this.$('.js-password2');
            this.$bday = this.$('.js-bday');
        },

        register: function (event) {
            event.preventDefault();
            this.$alert.html('');

            var regExp = /^[a-z0-9]+$/i;

            if (!regExp.test(this.$login.val()) || !regExp.test(this.$password.val())) {
                this.$alert.html('Логин и пароль должны содержать только цифры и латинские буквы');
                return;
            }

            if (this.$password.val() !== this.$password2.val()) {
                this.$alert.html('Пароли не совпадают');
                return;
            }

            if (this.$password.val().length < 6) {
                this.$alert.html('Пароль не должен быть короче 6 символов');
                return;
            }

            user.create(this.$login.val(), this.$password.val(), this.$email.val(), this.$bday.val());
        },

        registerError: function (errorMsg) {
            this.$alert.html(errorMsg);
        },

        registerOk: function () {
            this.$login.val('');
            this.$email.val('');
            this.$password.val('');
            this.$password2.val('');
        }

    });

    return RegistrationView;

});