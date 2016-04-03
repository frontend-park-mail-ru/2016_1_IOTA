define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/reg_auth');

    //noinspection UnnecessaryLocalVariableJS
    var RegAuthView = BaseView.extend({

        template: tmpl

    });

    return RegAuthView;

});