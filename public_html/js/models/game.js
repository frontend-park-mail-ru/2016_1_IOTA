define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var GameModel = Backbone.Model.extend({

        url: '/api/game'

        // defaults: {
        //     id: -1,
        // },
        
    });

    return new GameModel();

});