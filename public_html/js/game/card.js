define(function (require) {

    var __extends = require('./extends'),
        Sprite = require('./sprite');

    //noinspection UnnecessaryLocalVariableJS
    var Card = (function (_super) {

        __extends(Card, _super);

        function Card() {
            _super.apply(this, arguments);
        }

        return Card;

    }(Sprite));

    return Card;

});
