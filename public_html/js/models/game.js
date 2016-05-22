define(function (require) {

    var Backbone = require('backbone'),
        socket = require('models/ws');

    //noinspection UnnecessaryLocalVariableJS
    var GameModel = Backbone.Model.extend({

        url: '/api/ws',

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
        },

        sync: function(method, model, options){
            socket.send(JSON.stringify(model));
        }

    });

    return new GameModel();

});