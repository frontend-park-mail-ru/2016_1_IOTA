define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/game');

    //noinspection UnnecessaryLocalVariableJS
    var GameView = BaseView.extend({
        template: tmpl

    });

    return GameView;

});