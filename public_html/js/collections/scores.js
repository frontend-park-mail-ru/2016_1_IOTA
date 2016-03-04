define([
    'backbone',
    'models/score'
], function(
    Backbone,
    ScoreModel
){

    var Collection = Backbone.Collection.extend({
        model: ScoreModel
    });

    return Collection;
});
