define(function (require) {

    var __extends = require('./extends'),
        Renderer = require('./renderer'),
        Tile = require('./tile');

    //noinspection UnnecessaryLocalVariableJS
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
            var context = canvas.getContext("2d");
            var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.height / 10, 0, canvas.height / 2, canvas.width);
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, "gray");
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < this.drawables.length; i++) {
                this.drawables[i].draw(canvas);
            }
        };

        Table.prototype.placeCard = function (card, camera, canvas) {
            var tile = this.getTileForCard(card, camera, canvas);
            if (tile != null) {
                tile.setContent(card);
                card.setInHand(false);
            }
        };

        Table.prototype.checkPlace = function (card, camera, canvas) {
            var tile = this.getTileForCard(card, camera, canvas);
            if (tile != null) {
                card.setHighlightColor("green");
            }
            else {
                card.setHighlightColor("red");
            }
        };

        Table.prototype.getTileForCard = function (card, camera, canvas) {
            var x = camera.getX() + card.getX() * camera.getWidth() / canvas.width + card.getWidth() / 2, y = camera.getY() + card.getY() * camera.getHeight() / canvas.height + card.getHeight() / 2;
            for (var i = 0; i < this.drawables.length; i++) {
                if (this.drawables[i].contains(x, y) && this.drawables[i].canContain(card)) {
                    return this.drawables[i];
                }
            }
            return null;
        };

        Table.prototype.getTile = function (index) {
            return this.drawables[index];
        };

        return Table;

    }(Renderer));

    return Table;

});
