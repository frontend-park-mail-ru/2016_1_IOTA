define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var HandModel = Backbone.Model.extend({

        url: '/hand/',

        read: function () {
            this.fetch({
                success: function (collection, response) {
                    console.log(response);
                },
                error: function (collection, response) {
                    console.log(response);
                }
            });
        },

        update: function () {
            this.save({
                success: function (collection, response) {
                    console.log(response);
                },
                error: function (collection, response) {
                    console.log(response);
                }
            });
        }

    });

    return HandModel;

});