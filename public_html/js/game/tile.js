define(function (require) {

    var __extends = require('./extends'),
        Sprite = require('./sprite');

    //noinspection UnnecessaryLocalVariableJS
    var Tile = (function (_super) {

        __extends(Tile, _super);

        function Tile(x, y, width, height) {
            _super.call(this, x, y, width, height);
        }

        Tile.prototype.draw = function (canvas) {
            if (this.content) {
                this.content.draw(canvas);
            }
            else {
                var context = canvas.getContext('2d');
                context.strokeRect(this.x, this.y, this.width, this.height);
            }
        };

        return Tile;

    }(Sprite));

    return Tile;

});
