define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/main');

    //noinspection UnnecessaryLocalVariableJS
    var MainView = BaseView.extend({

        template: tmpl

    });

    return MainView;

});