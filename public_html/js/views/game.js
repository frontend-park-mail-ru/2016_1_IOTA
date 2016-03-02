define([
    'backbone',
    'tmpl/game',
    '../game/game'
], function(
    Backbone,
    tmpl,
    game
) {

    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,
        initialize: function () {
            // TODO
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

    return View;
});