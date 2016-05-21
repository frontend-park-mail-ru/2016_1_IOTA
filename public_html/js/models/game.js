define(function (require) {

    var Backbone = require('backbone');
    var ws;
    //noinspection UnnecessaryLocalVariableJS
    var GameModel = Backbone.Model.extend({
        initws: function(webs) {
            ws = webs;
        },
        url: '/api/ws',

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
            this.save(null, {
                success: function (collection, response) {
                    console.log(response);
                },
                error: function (collection, response) {
                    console.log(response);
                }
            });
        },
        sync: function(method, model, options){
            ws.send(JSON.stringify(model));
        }

    });

    return new GameModel();

});