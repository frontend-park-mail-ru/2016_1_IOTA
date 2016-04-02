define(function (require) {

    var Backbone = require('backbone'),
        $ = require('jquery');

    //noinspection UnnecessaryLocalVariableJS
    var SessionModel = Backbone.Model.extend({

        url: '/api/session/',

        defaults: {
            // Otherwise requests will be not sent
            id: -1
        },
        // TODO
        isAuth: false,

        // TODO: Use internal model requests
        login: function (login, password) {
            /*
            var self = this;
            $.ajax({
                method: 'PUT',
                url: this.url,
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
            */
            this.save({login: login, password: password},{

                success: function (model, response) {
                    console.log(response);
                    if (response.status === 0) {
                        // TODO
                        model.isAuth = true;
                        model.trigger('loginOk');
                    } else {
                        model.trigger('loginError', response.message);
                    }
                },

                error: function (model, response) {
                    console.log(response);
                    model.trigger('loginError', 'Неизвестная ошибка');
                }

            });
        },

        logout: function () {
            /*
            var self = this;
            $.ajax({
                method: 'DELETE',
                url: this.url,
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
            */
            this.destroy({

                success: function (model, response) {
                    // TODO: model.set('isAuth', false);
                    model.isAuth = false;
                    console.log(response);
                    model.trigger('logoutOk');
                },

                error: function(model, response) {
                    console.log(response);
                    model.trigger('logoutError');
                }

            });
        },

        get: function () {
            /*
            var self = this;
            $.ajax({
                method: 'GET',
                url: this.url,
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
            */
            this.fetch({

                success: function (model, response) {
                    console.log(response);
                    model.isAuth = true;
                    model.trigger('authChecked', 'Вход выполнен');
                },

                error: function (model, response) {
                    console.log(response);
                    model.trigger('authChecked', 'Необходимо выполненить вход');
                }

            });
        }

    });

    return new SessionModel();

});