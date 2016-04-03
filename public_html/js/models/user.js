define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var UserModel = Backbone.Model.extend({

        url: '/api/user/',

        defaults: {
            id: -1
        },

        read: function () {
            this.fetch({
                url: this.url + this.get('id'),
                success: function (model, response) {
                    console.log(response);
                },
                error: function (model, response) {
                    console.log(response);
                }
            });
        },

        delete: function (id) {
            this.destroy({
                url: this.url + this.get('id'),
                success: function (model, response) {
                    console.log(response);
                },
                error: function (model, response) {
                    console.log(response);
                }
            });
        },

        create: function (login, password, email) {
            this.save({login: login, password: password, email: email},{
                success: function (model, response) {
                    console.log(response);
                    if (response.status === 0) {
                        model.trigger('registerOk');
                    } else {
                        model.trigger('registerError', response.message);
                    }
                },
                error: function (model, response) {
                    console.log(response);
                    model.trigger('registerError', 'Неизвестная ошибка');
                }
            });
        },

        update: function (login, password, email) {
            this.save({login: login, password: password, email: email},{
                url: this.url + this.get('id'),
                success: function (model, response) {
                    console.log(response);
                },
                error: function (model, response) {
                    console.log(response);
                }
            });
        }

    });

    return new UserModel();

});