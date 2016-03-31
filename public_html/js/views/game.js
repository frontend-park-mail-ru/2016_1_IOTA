define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/game'),
        game = require('../game/game');

    //noinspection UnnecessaryLocalVariableJS
    var GameView = BaseView.extend({

        template: tmpl,

        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'hidden');
            //game();
        }

    });

    return GameView;

});