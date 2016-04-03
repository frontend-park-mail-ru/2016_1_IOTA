define(function (require) {
    QUnit.module("collections/scores");

    QUnit.test("Scores -- Backbone.Collection", function () {
        var ScoresModel = require('./scores'),
            scores = new ScoresModel();

        QUnit.ok(scores instanceof Backbone.Collection);
    });

    QUnit.test("Scores -- Sort Results", function() {
        var ScoreCollection = require('./scores'),
            ScoreModel = require('models/score'),
            scores = new ScoreCollection();

        var names = ['Vasiliy', 'Ivan', 'Petr', 'Vladimir'];
        var points = [1, 6, 9, 8];

        for (var i = 0; i < names.length; i++) {
            scores.add(new ScoreModel({name: names[i], score: points[i]}));
        }

        QUnit.equal(JSON.stringify(scores.toJSON()), JSON.stringify([
            {name: names[2], score: points[2]},
            {name: names[3], score: points[3]},
            {name: names[1], score: points[1]},
            {name: names[0], score: points[0]}
        ]));
    });
});
