define([
    'backbone',
    'tmpl/main'
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
            // TODO
            console.log(this.session.isAuthenticated);
            this.$el.html(this.template({isAuthenticated: this.session.isAuthenticated}));
            this.$el.css('overflow', 'visible');
        },
        show: function () {
            this.render();
        },
        hide: function () {
            // TODO
        }

    });

    return View;
});