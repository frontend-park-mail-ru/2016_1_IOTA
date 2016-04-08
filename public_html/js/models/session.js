define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var SessionModel = Backbone.Model.extend({

        url: '/api/session',

        defaults: {
            // Otherwise requests will be not sent
            id: -1,
            isAuth: false
        },

        login: function (login, password) {
            this.save({login: login, password: password},{
                success: function (model, response) {
                    console.log(response);
                    model.set('isAuth', true);
                    model.trigger('loginOk');
                },
                error: function (model, response) {
                    console.log(response);
                    model.trigger('loginError', 'Неизвестная ошибка');
                }
            });
        },

        logout: function () {
            this.destroy({
                success: function (model, response) {
                    console.log(response);
                    model.set('isAuth', false);
                    model.trigger('logoutOk');
                },
                error: function(model, response) {
                    console.log(response);
                    model.trigger('logoutError');
                }
            });
        },

        read: function () {
            this.fetch({
                success: function (model, response) {
                    console.log(response);
                    model.set('isAuth', true);
                    model.trigger('authChecked', 'Вход выполнен');
                },
                error: function (model, response) {
                    console.log(response);
                    model.trigger('authChecked', 'Необходимо выполнить вход');
                }
            });
        }

    });

    return new SessionModel();

});