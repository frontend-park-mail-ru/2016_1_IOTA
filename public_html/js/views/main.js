define(function (require) {

    var Backbone = require('backbone'),
        tmpl = require('tmpl/main');

    //noinspection UnnecessaryLocalVariableJS
    var MainView = Backbone.View.extend({

        // TODO: Remove el from all views
        el: '#page',
        template: tmpl,

        initialize: function (session) {
            this.session = session;
        },

        render: function () {
            console.log("Third: " + this.session.isAuth);
            this.$el.html(this.template({isAuth: this.session.isAuth}));
            // TODO: Remove this from all views
            this.$el.css('overflow', 'visible');
        },

        show: function () {
            this.render();
        },

        hide: function () {
            // TODO
        }

    });

    return MainView;

});