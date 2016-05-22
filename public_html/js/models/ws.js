define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var Socket = Backbone.Model.extend({

        connect: function () {
            this.socket = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port + '/api/ws');

            this.socket.onopen = function() {
                console.log("Соединение установлено.");
            };

            this.socket.onclose = function(event) {
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }
                console.log('Код: ' + event.code + ' причина: ' + event.reason);
            };

            this.socket.onmessage = function(event) {
                //console.log(JSON.stringify(view));
                Backbone.Events.trigger('sync');
                console.log("Получены данные " + event.data);
            };

            this.socket.onerror = function(error) {
                console.log("Ошибка " + error.message);
            };
        },

        close: function () {
            this.socket.close();
        },

        send: function (data) {
            this.socket.send(data);
        }

    });

    return new Socket();

});