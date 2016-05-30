define(function (require) {

    var __extends = require('./extends'),
        Sprite = require('./sprite');

    //noinspection UnnecessaryLocalVariableJS
    var Card = (function (_super) {

        __extends(Card, _super);

        function Card(x, y, width, height, number, color, shape, inHand, concrete) {
            _super.call(this, x, y, width, height);
            this.inHand = inHand;
            this.image = new Image();
            this.concrete = concrete;
            this.image.src = '/images/' + concrete + color + shape + number + '.png';
            this.number = number;
            this.color = color;
            this.shape = shape;
            this.highlightColor = "black";
        }

        Card.prototype.getInHand = function () {
            return this.inHand;
        };

        Card.prototype.setInHand = function (inHand) {
            this.inHand = inHand;
        };

        Card.prototype.getNumber = function () {
            return this.number;
        };

        Card.prototype.getColor = function () {
            return this.color;
        };

        Card.prototype.getConcrete = function () {
            return this.concrete;
        };

        Card.prototype.getShape = function () {
            return this.shape;
        };

        Card.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            /*
             context.shadowBlur = 10;
             if (this.inHand) {
             context.shadowColor = this.highlightColor;
             }
             */
            if (this.inHand) {
                context.shadowBlur = 10;
                context.shadowColor = this.highlightColor;
            }
            else {
                context.shadowBlur = 1;
                context.shadowColor = "black";
            }
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.shadowBlur = 0;
        };

        Card.prototype.setHighlightColor = function (color) {
            this.highlightColor = color;
        };

        return Card;

    }(Sprite));

    return Card;

});
