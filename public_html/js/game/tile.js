define(function (require) {

    var __extends = require('./extends'),
        Sprite = require('./sprite');

    //noinspection UnnecessaryLocalVariableJS
    var Tile = (function (_super) {

        __extends(Tile, _super);

        function Tile(x, y, width, height) {
            _super.call(this, x, y, width, height);
            this.validNumbers = ['1'];
            this.validColors = ['y'];
            this.validShapes = ['x'];
        }

        Tile.prototype.draw = function (canvas) {
            if (this.content) {
                this.content.draw(canvas);
            }
            else {
                var context = canvas.getContext('2d');
            }
        };

        Tile.prototype.setContent = function (card) {
            card.setX(this.x);
            card.setY(this.y);
            this.content = card;
        };

        Tile.prototype.canContain = function (card) {
            return (this.validNumbers.indexOf(card.getNumber()) > -1 && this.validColors.indexOf(card.getColor()) > -1
            && this.validShapes.indexOf(card.getShape()) > -1);
        };

        Tile.prototype.setValid = function (numbers, colors, shapes) {
            this.validColors = colors;
            this.validNumbers = numbers;
            this.validShapes = shapes;
        };

        return Tile;

    }(Sprite));

    return Tile;

});
