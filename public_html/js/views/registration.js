define([
    'backbone',
    'tmpl/registration',
    'messaging_center'
], function(
    Backbone,
    tmpl,
    messagingCenter
) {

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

            if (this.password.value !== this.confirm_password.value) {
                event.data.alert.html('Пароли не совпадают');
                return;
            }

            event.data.session.register(this.name.value, this.password.value, this.email.value);
        },
        registerError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return View;
});