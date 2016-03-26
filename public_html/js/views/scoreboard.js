define(function (require) {

    var Backbone = require('backbone'),
        ScoreModel = require('models/score'),
        tmpl = require('tmpl/scoreboard'),
        ScoreCollection = require('collections/scores'),
        ScoreboardItemView = require('./scoreboard_item');

    //noinspection UnnecessaryLocalVariableJS
    var ScoreboardView = Backbone.View.extend({

        template: tmpl,

        initialize: function (session) {
            this.session = session;
            this.scores = new ScoreCollection();

            var names = [
                'Anthony Langdon',
                'Katherine Bailey',
                'Lauren Hamilton',
                'Brian Hart',
                'Audrey Hunter',
                'Julian Knox',
                'Emma Wright',
                'Richard Fraser',
                'Colin Payne',
                'Keith Young'
            ];

            for (var i = 0; i < names.length; i++) {
                this.scores.add(new ScoreModel({name: names[i], score: Math.round(Math.random() * 1000)}));
            }

            this.render();
        },

        render: function () {
            console.log("RENDER SCOREBOARD");
            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            this.$table = this.$('#table').html('');

            var count = 1,
                self = this;

            this.scores.each(function(model) {
                var view = new ScoreboardItemView({model: model});
                self.$table.append(view.render({count: count}).el);
                count++;
            });
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        }

    });

    return ScoreboardView;

});