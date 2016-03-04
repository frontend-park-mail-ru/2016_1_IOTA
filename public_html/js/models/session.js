define([
    'backbone',
    'jquery',
    'messaging_center'
], function (
    Backbone,
    $,
    messagingCenter
) {

    var SessionModel = Backbone.Model.extend({
        sessionUrl: '/api/session/',
        default: {
            isAuth: false
        },
        isAuth: false,
        //userUrl: '/api/user/',
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
                    if (data.status === 0) {
                        self.isAuth = true;
                        messagingCenter.trigger('loginOk');
                        // TODO
                        console.log(self);
                    } else {
                        messagingCenter.trigger('loginError', data.message);
                    }
                },
                error: function (data) {
                    messagingCenter.trigger('loginError', 'Неизвестная ошибка');
                }
            });
        },
        logout: function () {
            $.ajax({
                method: 'DELETE',
                url: this.sessionUrl,
                success: function (data) {
                    self.isAuth = false;
                    console.log(data);
                },
                error: function(data) {
                    console.log(data);
                }
            });
        },
        get: function () {
            var self = this;
            $.ajax({
                method: 'GET',
                url: this.sessionUrl,
                success: function (data) {
                    self.isAuth = true;
                    console.log(data);
                    console.log("First: " + self.isAuth);
                    messagingCenter.trigger('authChecked', 'Вход выполнен');
                },
                error: function (data) {
                    console.log(data);
                    messagingCenter.trigger('authChecked', 'Необходимо выполненить вход');
                }
            });
        }
    });

    return SessionModel;

});