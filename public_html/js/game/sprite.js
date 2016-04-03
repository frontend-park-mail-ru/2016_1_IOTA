define(function () {

    //noinspection UnnecessaryLocalVariableJS
    var Sprite = (function () {

        function Sprite(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        Sprite.prototype.getX = function () {
            return this.x;
        };

        Sprite.prototype.getY = function () {
            return this.y;
        };

        Sprite.prototype.setX = function (x) {
            this.x = x;
        };

        Sprite.prototype.setY = function (y) {
            this.y = y;
        };

        Sprite.prototype.getWidth = function () {
            return this.width;
        };

        Sprite.prototype.getHeight = function () {
            return this.height;
        };

        Sprite.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            context.fillRect(this.x, this.y, this.width, this.height);
        };

        Sprite.prototype.contains = function (x, y) {
            return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
        };

        return Sprite;

    }());

    return Sprite;

});