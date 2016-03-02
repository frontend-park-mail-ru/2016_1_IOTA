define([
    './extends',
    './renderer',
    './tile'
], function (
    __extends,
    Renderer,
    Tile
) {

    var Table = (function (_super) {
        __extends(Table, _super);
        function Table(rows, columns, tileWidth, tileHeight) {
            _super.call(this);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    this.drawables.push(new Tile(i * tileWidth, j * tileHeight, tileWidth, tileHeight));
                }
            }
        }

        Table.prototype.draw = function (canvas) {
            for (var i = 0; i < this.drawables.length; i++) {
                this.drawables[i].draw(canvas);
            }
        };
        return Table;
    }(Renderer));

    return Table;

});
