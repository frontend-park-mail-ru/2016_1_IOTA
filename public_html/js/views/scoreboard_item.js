define(function (require) {

    var Backbone = require('backbone'),
        tmpl = require('tmpl/scoreboard_item');

    //noinspection UnnecessaryLocalVariableJS
    var ScoreboardItemView = Backbone.View.extend({

        tagName: 'tr',

        template: tmpl,

        initialize: function () {
            // TODO
        },

        render: function (json) {
            for (var attr in json) {
                //noinspection JSUnfilteredForInLoop
                this.model.set(attr, json[attr]);
            }
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        show: function () {
            this.render();
        },

        hide: function () {
            // TODO
        }

    });

    return ScoreboardItemView;

});