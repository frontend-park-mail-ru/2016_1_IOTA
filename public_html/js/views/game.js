define(function (require) {

    var Backbone = require('backbone'),
        tmpl = require('tmpl/game'),
        game = require('../game/game');

    //noinspection UnnecessaryLocalVariableJS
    var GameView = Backbone.View.extend({

        template: tmpl,

        initialize: function (session) {
            this.session = session;
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'hidden');
            //game();
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        }

    });

    return GameView;

});