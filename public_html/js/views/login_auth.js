define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/login_auth');

    //noinspection UnnecessaryLocalVariableJS
    var LoginAuthView = BaseView.extend({

        template: tmpl

    });

    return LoginAuthView;

});