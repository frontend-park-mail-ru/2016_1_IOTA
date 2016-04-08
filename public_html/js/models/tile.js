define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var TileModel = Backbone.Model.extend({

        defaults: {
            image: '',
            x: -1,
            y: -1,
            allowedImages: [],
        }

    });

    return TileModel;

});