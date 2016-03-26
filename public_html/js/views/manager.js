define(function (require) {

    var Backbone = require('backbone');

    var views = [];

    //noinspection UnnecessaryLocalVariableJS
    var Manager = Backbone.View.extend({

        el: '#page',

        addView: function (view) {
            views.push(view);
            this.$el.append(view.el);
            this.listenTo(view, 'show', function () {
                for (var i = 0; i < views.length; i++) {
                    if (views[i] != view) {
                        views[i].hide();
                    }
                }
            });
        }
    });

    return Manager;
});