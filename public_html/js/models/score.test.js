define(function (require) {
    QUnit.module("models/score");

    QUnit.test("ScoreModel - экземпляр Backbone.Model", function () {

        var ScoreModel = require('./score'),
            score = new ScoreModel();

        QUnit.ok(score instanceof Backbone.Model);

    });

    QUnit.test("ScoreModel - корректность значений по умолчанию", function () {
        var ScoreModel = require('./score'),
            score = new ScoreModel();

        QUnit.equal(score.get('name'), '', 'Некорректное имя по умолчанию');
        QUnit.equal(score.get('score'), 0, 'Некорректный счёт по умолчанию');
    });

    QUnit.test("ScoreModel - корректность установки значений", function () {
        var ScoreModel = require('./score'),
            score = new ScoreModel({name: 'Artem', score: 1337});

        QUnit.equal(score.get('name'), 'Artem', 'Имя установлено некорректно');
        QUnit.equal(score.get('score'), 1337, 'Имя установлено некорректно');
    });
});
