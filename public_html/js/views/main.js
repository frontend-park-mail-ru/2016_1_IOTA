define(function (require) {

    var Backbone = require('backbone');
    var Template = require('tmpl/main');

    //noinspection UnnecessaryLocalVariableJS
    var View = Backbone.View.extend({

        el: '#page',
        template: Template,

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