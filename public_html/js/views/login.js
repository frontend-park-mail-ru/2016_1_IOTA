define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
) {

    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            $('.js-submit').on('submit', this.login);
        },
        show: function () {
            this.render();
        },
        hide: function () {
            // TODO
        },
        login: function (event) {
            event.preventDefault();
            alert("Email: " + this.email.value + "\nPassword: " + this.password.value);
        }

    });

    return View;
});