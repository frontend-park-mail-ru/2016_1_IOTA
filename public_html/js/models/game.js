define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var GameModel = Backbone.Model.extend({

        url: '/api/game',

        read: function () {
            this.fetch({
                success: function (collection, response) {
                    console.log(response);
                },
                error: function (collection, response) {
                    console.log(response);
                }
            });
        },

        update: function () {
            this.save(null, {
                success: function (collection, response) {
                    console.log(response);
                },
                error: function (collection, response) {
                    console.log(response);
                }
            });
        }

    });

    return new GameModel();

});