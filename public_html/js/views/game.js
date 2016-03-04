define(function (require) {

    var Backbone = require('backbone'),
        tmpl = require('tmpl/game'),
        game = require('../game/game');

    //noinspection UnnecessaryLocalVariableJS
    var GameView = Backbone.View.extend({

        el: '#page',
        template: tmpl,

        initialize: function (session) {
            this.session = session;
        },

        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'hidden');
            game();
        },

        show: function () {
            this.render();
        },

        hide: function () {
            // TODO
        }

    });

    return GameView;

});