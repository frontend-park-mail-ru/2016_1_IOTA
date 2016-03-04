define([
    'backbone',
    'jquery',
    'messaging_center'
], function (
    Backbone,
    $,
    messagingCenter
) {

    var UserModel = Backbone.Model.extend({
        userUrl: '/api/user/',
        /*
        id: '',
        login: '',
        email: '',
        */
        get: function (id) {
            var self = this;
            $.ajax({
                method: 'GET',
                url: this.userUrl + id,
                success: function (data) {
                    console.log(data);
                    /*
                    if (data.status === 0) {
                        self.isAuth = true;
                        messagingCenter.trigger('loginOk');
                        // TODO
                        console.log(self);
                    } else {
                        messagingCenter.trigger('loginError', data.message);
                    }
                    */
                },
                error: function (data) {
                    console.log(data);
                    //messagingCenter.trigger('loginError', 'Неизвестная ошибка');
                }
            });
        },
        delete: function (id) {
            $.ajax({
                method: 'DELETE',
                url: this.userUrl + id,
                success: function (data) {
                    console.log(data);
                },
                error: function() {
                    console.log(data);
                }
            });
        },
        create: function (login, password, email) {
            $.ajax({
                method: 'POST',
                url: this.userUrl,
                data: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status === 0) {
                        messagingCenter.trigger('registerOk');
                    } else {
                        messagingCenter.trigger('registerError', data.message);
                    }
                },
                error: function () {
                    messagingCenter.trigger('registerError', 'Неизвестная ошибка');
                }
            });
        },
        update: function (login, password, email) {
            $.ajax({
                method: 'POST',
                url: this.userUrl + id,
                data: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                    /*
                    if (data.status === 0) {
                        messagingCenter.trigger('registerOk');
                    } else {
                        messagingCenter.trigger('registerError', data.message);
                    }
                    */
                },
                error: function (data) {
                    /*
                    messagingCenter.trigger('registerError', 'Неизвестная ошибка');
                    */
                    console.log(data);
                }
            });
        }
    });

    return UserModel;

});