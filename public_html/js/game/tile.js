define(function (require) {

    var __extends = require('./extends'),
        Sprite = require('./sprite');

    //noinspection UnnecessaryLocalVariableJS
    var Tile = (function (_super) {

        __extends(Tile, _super);

        function Tile(x, y, width, height) {
            _super.call(this, x, y, width, height);
            this.validNumbers = [];
            this.validColors = [];
            this.validShapes = [];
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
            return ((this.validNumbers.indexOf(card.getNumber()) > -1 || this.validColors.indexOf(card.getColor()) > -1
            || this.validShapes.indexOf(card.getShape()) > -1 || (card.getConcrete() && this.validNumbers.length)) && this.content == undefined);
        };

        Tile.prototype.setValid = function (numbers, colors, shapes) {
            for(var i = 0; i < numbers.length; i++) if(!(this.validNumbers.indexOf(numbers[i]) > -1)) this.validNumbers.push(numbers[i]);
            for(var i = 0; i < colors.length; i++) if(!(this.validColors.indexOf(colors[i]) > -1)) this.validColors.push(colors[i]);
            for(var i = 0; i < shapes.length; i++) if(!(this.validShapes.indexOf(shapes[i]) > -1)) this.validShapes.push(shapes[i]);
        };

        return Tile;

    }(Sprite));

    return Tile;

});
