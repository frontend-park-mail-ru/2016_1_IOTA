define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/main_auth');

    //noinspection UnnecessaryLocalVariableJS
    var MainAuthView = BaseView.extend({

        template: tmpl

    });

    return MainAuthView;

});