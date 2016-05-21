define(function (require) {
    var Backbone = require('backbone');

    var socket = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port + '/api/ws');

    socket.onopen = function() {
        console.log("Соединение установлено.");
    };
    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };

    socket.onmessage = function(event) {
        //console.log(JSON.stringify(view));
        Backbone.Events.trigger('sync');
        console.log("Получены данные " + event.data);
    };

    socket.onerror = function(error) {
        console.log("Ошибка " + error.message);
    };

    return socket;

});
