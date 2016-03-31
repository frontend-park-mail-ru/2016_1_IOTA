define(function (require) {

    var Backbone = require('backbone'),
        $ = require('jquery');

    //noinspection UnnecessaryLocalVariableJS
    var SessionModel = Backbone.Model.extend({

        sessionUrl: '/api/session/',

        isAuth: false,

        // TODO: Use internal model requests
        login: function (login, password) {
            var self = this;
            $.ajax({
                method: 'PUT',
                url: this.sessionUrl,
                data: JSON.stringify({
                    'login': login,
                    'password': password
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                    if (data.status === 0) {
                        self.isAuth = true;
                        self.trigger('loginOk');
                    } else {
                        self.trigger('loginError', data.message);
                    }
                },
                error: function (data) {
                    console.log(data);
                    self.trigger('loginError', 'Неизвестная ошибка');
                }
            });
        },

        logout: function () {
            var self = this;
            $.ajax({
                method: 'DELETE',
                url: this.sessionUrl,
                success: function (data) {
                    self.isAuth = false;
                    console.log(data);
                    self.trigger('logoutOk');
                },
                error: function(data) {
                    console.log(data);
                    self.trigger('logoutError');
                }
            });
        },

        get: function () {
            var self = this;
            $.ajax({
                method: 'GET',
                url: this.sessionUrl,
                success: function (data) {
                    console.log(data);
                    self.isAuth = true;
                    self.trigger('authChecked', 'Вход выполнен');
                },
                
                error: function (data) {
                    console.log(data);
                    self.trigger('authChecked', 'Необходимо выполненить вход');
                }
            });
        }

    });

    return new SessionModel();

});