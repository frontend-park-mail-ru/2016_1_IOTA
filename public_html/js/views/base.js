define(function (require) {

    var Backbone = require('backbone'),
        UserModel = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var BaseView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            //this.$el.html(this.$el.html() + '<h1>Username</h1>');
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        }

    });

    return BaseView;

});