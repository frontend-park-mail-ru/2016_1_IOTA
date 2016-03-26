define(function (require) {

    var Backbone = require('backbone'),
        tmpl = require('tmpl/registration'),
        tmplAuth = require('tmpl/registration_auth');

    //noinspection UnnecessaryLocalVariableJS
    var RegistrationView = Backbone.View.extend({

        //el: '#page',
        template: tmpl,
        templateAuth: tmplAuth,

        initialize: function (session, user) {
            this.session = session;
            this.user = user;
            this.listenTo(Backbone.Events, 'registerError', this.registerError);
            this.render();
        },

        render: function () {
            if (this.session.isAuth) {
                this.$el.html(this.templateAuth);
                return;
            }

            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            this.$alert = this.$('.js-alert');
            this.$('.js-submit').on('submit', {user: this.user, alert: this.$alert}, this.register);
        },

        show: function () {
            //this.render();
            this.trigger('show', this);
            this.$el.show();

        },

        hide: function () {
            this.$el.hide();
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

            event.data.user.create(this.login.value, this.password.value, this.email.value);
        },

        registerError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return RegistrationView;

});