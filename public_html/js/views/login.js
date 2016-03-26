define(function (require) {

    var Backbone = require('backbone'),
        tmpl = require('tmpl/login'),
        tmplAuth = require('tmpl/login_auth');

    //noinspection UnnecessaryLocalVariableJS
    var LoginView = Backbone.View.extend({

        //el: '#page',
        template: tmpl,
        templateAuth: tmplAuth,

        initialize: function (session) {
            this.session = session;
            this.listenTo(Backbone.Events, 'loginError', this.loginError);
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
            this.$('.js-submit').on('submit', {session: this.session, alert: this.$alert}, this.login);
        },

        show: function () {
            //this.render();
            this.trigger('show', this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
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