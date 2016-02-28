define(['backbone', 'tmpl/main'], function(Backbone, tmpl) {

    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            this.$el.html(this.template);
            $('#header').show();
            $('body').css('overflow', 'visible');
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