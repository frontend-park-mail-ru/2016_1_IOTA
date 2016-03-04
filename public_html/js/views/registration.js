define(function (require) {

    var Backbone = require('backbone');
    var tmpl = require('tmpl/registration');
    var messagingCenter = require('messaging_center');

    //noinspection UnnecessaryLocalVariableJS
    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,

        initialize: function (session) {
            this.session = session;
            this.listenTo(messagingCenter, 'registerError', this.registerError)
        },

        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            this.$alert = $('.js-alert');
            $('.js-submit').on('submit', {session: this.session, alert: this.$alert}, this.register);
        },

        show: function () {
            this.render();
        },

        hide: function () {
            // TODO
        },

        register: function (event) {
            event.preventDefault();
            event.data.alert.html('');

            if (this.password.value.trim() !== this.confirm_password.value.trim()) {
                event.data.alert.html('Пароли не совпадают');
                return;
            }

            event.data.session.register(this.login.value.trim(), this.password.value.trim(), this.email.value.trim());
        },

        registerError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return View;

});