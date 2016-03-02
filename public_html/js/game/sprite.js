define([
    './extends'
], function (
    __extends
) {

    var Sprite = (function () {
        function Sprite(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        Sprite.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            context.fillRect(this.x, this.y, this.width, this.height);
        };
        return Sprite;
    }());

    return Sprite;

});