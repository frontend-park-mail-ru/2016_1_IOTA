define(function (require) {

    var Backbone = require('backbone'),
        CardModel = require('models/card'),
        user = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var TableCollection = Backbone.Collection.extend({

        model: CardModel,

        url: '/table/' /*+ user.get('id')*/,

        read: function () {
            this.fetch({
                success: function (collection, response) {
                    console.log(response);
                },
                error: function (collection, response) {
                    console.log(response);
                }
            });
        }

    });

    return TableCollection;

});
