define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var Manager = Backbone.View.extend({

        el: '#page',

        initialize: function (views) {
            this.views = views;
            this.hideViews();
            for (var view in this.views) {
                //noinspection JSUnfilteredForInLoop
                this.$el.append(this.views[view].el);
                //noinspection JSUnfilteredForInLoop
                this.listenTo(this.views[view], 'show', this.hideViews);
            }
        },

        hideViews: function () {
            for (var view in this.views) {
                //noinspection JSUnfilteredForInLoop
                this.views[view].hide();
            }
        }

    });

    return Manager;

});