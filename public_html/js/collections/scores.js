define(function (require) {

    var Backbone = require('backbone');
    var ScoreModel = require('models/score');

    //noinspection UnnecessaryLocalVariableJS
    var Collection = Backbone.Collection.extend({
        model: ScoreModel
    });

    return Collection;
    
});
