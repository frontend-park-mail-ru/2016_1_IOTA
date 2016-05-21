define(function (require) {

    var BaseView = require('views/base');
    var socket = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port + '/api/ws');

    var WSView = BaseView.extend({
        template: tmpl

    });

    return WSView;

});