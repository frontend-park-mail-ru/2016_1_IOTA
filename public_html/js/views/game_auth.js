define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/game_auth'),
        game = require('../game/game'),
        gameModel = require('models/game');

    //noinspection UnnecessaryLocalVariableJS
    var GameAuthView = BaseView.extend({

        template: tmpl,

        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'hidden');
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();

            this.listenToOnce(gameModel, 'sync', function () {
                console.log('USERS CONNECTED');
                game(gameModel);
            });
            gameModel.update();
        }

    });

    return GameAuthView;

});
