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
            // TODO
            console.log(this.session.isAuthenticated);
            this.$el.html(this.template({
                isAuthenticated: this.session.isAuthenticated
            }));
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