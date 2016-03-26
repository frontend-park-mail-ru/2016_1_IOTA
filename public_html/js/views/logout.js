define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var LogoutView = Backbone.View.extend({

        //el: '#page',

        initialize: function (session, user) {
            this.session = session;
            this.user = user;
            this.render();
        },

        render: function () {
            this.$el.html('');
            this.session.logout();
        },

        show: function () {
            //this.render();
            this.trigger('show', this);
        },

        hide: function () {
            this.$el.hide();
        }

    });

    return LogoutView;

});