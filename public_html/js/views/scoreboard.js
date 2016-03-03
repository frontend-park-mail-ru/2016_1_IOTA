define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores',
    './scoreboard_item'
], function(
    Backbone,
    tmpl,
    ScoreModel,
    ScoreCollection,
    ScoreboardItemView
) {

    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,
        initialize: function (session) {
            this.session = session;
            this.scores = new ScoreCollection();
            this.scores.comparator = function(model1, model2) {
                var score1 = model1.get('score'),
                    score2 = model2.get('score');

                if (score1 > score2) {
                    return -1;
                } else if (score1 < score2) {
                    return 1;
                } else {
                    return 0;
                }
            };
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
        },
        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            this.$('#table').html('');
            var count = 1;
            this.scores.each(function(model) {
                var view = new ScoreboardItemView({model: model});
                this.$('#table').append(view.render({count: count}).el);
                count++;
            });
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