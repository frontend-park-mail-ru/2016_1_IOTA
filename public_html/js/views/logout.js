define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var LogoutView = Backbone.View.extend({

        initialize: function (session, user) {
            this.session = session;
            this.user = user;
            this.render();
        },

        render: function () {
            this.$el.html('');
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
            this.session.logout();
        },

        hide: function () {
            this.$el.hide();
        }

    });

    return LogoutView;

});