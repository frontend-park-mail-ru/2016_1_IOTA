define(function (require) {
    QUnit.module("collections/scores")

    QUnit.test("Scores -- Backbone.Collection", function () {
        var ScoresModel = require('./scores'),
            scores = new ScoresModel();

        QUnit.ok(scores instanceof Backbone.Collection);
    });

    QUnit.test("Scores -- Sort Results", function() {
        var ScoresModel = require('./scores'),
            scores = new ScoresModel();

        var ScoreModel = Backbone.Model.extend({
            defaults: {
                name: '',
                score: 0
            }
        });

        scores.comparator = function(model1, model2) {
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
            'Vasiliy',
            'Ivan',
            'Petr',
            'Vladimir',
        ];
        var points = [
            1,
            6,
            9,
            8,
        ];

        for (var i = 0; i < names.length; i++) {
            scores.add(new ScoreModel({name: names[i], score: points[i]}));
        }
        QUnit.equal(scores.at(1).get('name'), 'Vladimir', 'Sorted!');
    });
});
