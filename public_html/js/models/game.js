define(function (require) {

    var Backbone = require('backbone'),
        socket = require('models/ws');

    //noinspection UnnecessaryLocalVariableJS
    var GameModel = Backbone.Model.extend({
        
        url: '/api/game',
        message: "",
        initialize: function () {
            this.listenToOnce(socket, 'message', function (data) {
                this.trigger("ready");
            });
            this.listenTo(socket, 'message', function (data) {
                //console.log(data);
                data = JSON.parse(data);
                console.log('Обновление модели');
                this.message = data;
                this.trigger("sync");
            });
        },

        start: function () {
            socket.send(JSON.stringify({ready: true}));
        },
        
    });

    return new GameModel();

});