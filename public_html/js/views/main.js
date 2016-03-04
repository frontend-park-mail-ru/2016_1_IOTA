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
            console.log("Third: " + this.session.isAuth);
            this.$el.html(this.template({isAuth: this.session.isAuth}));
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