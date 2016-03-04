define(function (require) {

    var Backbone = require('backbone'),
        ScoreModel = require('models/score');

    //noinspection UnnecessaryLocalVariableJS
    var ScoreCollection = Backbone.Collection.extend({
        model: ScoreModel,
        comparator: function(model1, model2) {
            return model2.get('score') - model1.get('score');
        }
    });

    return ScoreCollection;
    
});
