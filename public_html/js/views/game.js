define(['backbone', 'tmpl/game', 'game/app'], function(Backbone, tmpl, game){

    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            this.$el.html(this.template);
            $('#header').hide();
            game();
            $('body').css('overflow', 'hidden');
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