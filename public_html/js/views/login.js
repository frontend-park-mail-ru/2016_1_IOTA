define(function (require) {

    var Backbone = require('backbone'),
        tmpl = require('tmpl/login'),
        tmplAuth = require('tmpl/login_auth'),
        messagingCenter = require('messaging_center');

    //noinspection UnnecessaryLocalVariableJS
    var LoginView = Backbone.View.extend({

        el: '#page',
        template: tmpl,
        templateAuth: tmplAuth,

        initialize: function (session) {
            this.session = session;
            this.listenTo(messagingCenter, 'loginError', this.loginError);
        },

        render: function () {
            if (this.session.isAuth) {
                this.$el.html(this.templateAuth);
                return;
            }

            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            this.$alert = $('.js-alert');
            $('.js-submit').on('submit', {session: this.session, alert: this.$alert}, this.login);
        },

        show: function () {
            this.render();
        },

        hide: function () {
            // TODO
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

            event.data.session.login(this.login.value, this.password.value);
        },

        loginError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return LoginView;

});