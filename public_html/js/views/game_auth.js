define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/game_auth');

    //noinspection UnnecessaryLocalVariableJS
    var GameAuthView = BaseView.extend({

        template: tmpl

    });

    return GameAuthView;

});
