define([
    './extends',
    './sprite'
], function (
    __extends,
    Sprite
) {

    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            _super.apply(this, arguments);
        }

        return Card;
    }(Sprite));

    return Card;

});
