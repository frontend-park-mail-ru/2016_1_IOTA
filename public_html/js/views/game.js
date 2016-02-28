define(['backbone', 'tmpl/game'], function(Backbone, tmpl){

    var View = Backbone.View.extend({

        el: '#game',
        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            this.$el.html(this.template);
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