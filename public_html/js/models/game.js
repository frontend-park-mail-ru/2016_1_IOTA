define(function (require) {

    var Backbone = require('backbone'),
        socket = require('models/ws');

    //noinspection UnnecessaryLocalVariableJS
    var GameModel = Backbone.Model.extend({

        initialize: function () {
            this.listenTo(socket, 'message', function (data) {
                console.log(data);
                data = JSON.parse(data);
                if (!data.__ok || !data.payload) {
                    return;
                }
                console.log('Обновление модели');
                this.set(data.payload);
            });
        },

        start: function () {
            socket.send(JSON.stringify({ready: true}));
        },

        sync: function(method, model, options) {
            switch(method) {
                case 'update':
                    socket.send(model.toJSON());
            }
        }
    });

    return new GameModel();

});