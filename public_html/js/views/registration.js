define([
    'backbone',
    'tmpl/registration'
], function(
    Backbone,
    tmpl
) {

    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,
        initialize: function (session) {
            this.session = session;
        },
        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            $('.js-submit').on('submit', this.session, this.register);
        },
        show: function () {
            this.render();
        },
        hide: function () {
            // TODO
        },
        register: function (event) {
            event.preventDefault();
            alert("Email: " + this.email.value +
                "\nName: " + this.name.value +
                "\nPassword: " + this.password.value +
                "\nConfirm Password: " + this.confirm_password.value);
        }

    });

    return View;
});