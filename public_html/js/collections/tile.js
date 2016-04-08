define(function (require) {

    var Backbone = require('backbone'),
        TileModel = require('models/tile');

    //noinspection UnnecessaryLocalVariableJS
    var TileCollection = Backbone.Collection.extend({

        model: TileModel

        //url: '/hand/' /*+ user.get('id')*/,

        /*
        read: function () {
            this.fetch({
                success: function (collection, response) {
                    console.log(response);
                },
                error: function (collection, response) {
                    console.log(response);
                }
            });
        }
        */

    });

    return TileCollection;

});
