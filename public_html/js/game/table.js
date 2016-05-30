define(function (require) {

    var __extends = require('./extends'),
        Renderer = require('./renderer'),
        Tile = require('./tile'),
        Card = require('./card');

    //noinspection UnnecessaryLocalVariableJS
    var Table = (function (_super) {

        __extends(Table, _super);

        function Table(rows, columns, tileWidth, tileHeight) {
            _super.call(this);

            var validNums = [];
            var validColors = [];
            var validShapes = [];
            this.isMyStep = false;

            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    var tile = new Tile(i * tileWidth, j * tileHeight, tileWidth, tileHeight);
                    tile.setValid(validNums, validColors, validShapes);
                    this.drawables.push(tile);
                }
            }
        }

        Table.prototype.draw = function (canvas) {
            var context = canvas.getContext("2d");
            for (var i = 0; i < this.drawables.length; i++) {
                this.drawables[i].draw(canvas);
            }
        };

        Table.prototype.placeCard = function (card, camera, canvas) {
            var tile = this.getTileForCard(card, camera, canvas);
            if (tile != null) {
                tile.setContent(card);
                card.setInHand(false);
                return {
                    x: tile.getX() / 100,
                    y: tile.getY() / 100,
                    card: {
                        uuid: card.getUuid(),
                        value: card.getNumber(),
                        color: card.getColor(),
                        shape: card.getShape(),
                        concrete: card.getConcrete()
                    }
                };
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
            var x = camera.getX() + card.getX() * camera.getWidth() / canvas.width + card.getWidth() / 2,
                y = camera.getY() + card.getY() * camera.getHeight() / canvas.height + card.getHeight() / 2;
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

        Table.prototype.getStep = function () {
            return this.isMyStep;
        };

        Table.prototype.setStep = function (step) {
            this.isMyStep = step;
        };

        Table.prototype.update = function (cards) {
            for (var i = 0; i < cards.length; i++) {
                //console.log(JSON.stringify({n:cards[i].number, c:cards[i].color, s:cards[i].shape, id:cards[i].uuid}));
                this.drawables[cards[i].x * 34 + cards[i].y].setContent(new Card(0, 0, 100, 100, cards[i].number, cards[i].color, cards[i].shape, false, cards[i].concrete, cards[i].uuid));
                var validNums = [],
                    validColors = [],
                    validShapes = [];
                if(cards[i].concrete) {
                    validNums = ['1', '2', '3', '4'];
                    validColors = ['y', 'r', 'g', 'b'];
                    validShapes = ['s', 't', 'c', 'x'];
                } else {
                    validNums.push(cards[i].number.toString());
                    validColors.push(cards[i].color);
                    validShapes.push(cards[i].shape);
                }
                this.getTile((cards[i].x) * 34 + cards[i].y + 1).setValid(validNums, validColors, validShapes);
                this.getTile((cards[i].x) * 34 + cards[i].y - 1).setValid(validNums, validColors, validShapes);
                this.getTile((cards[i].x + 1) * 34 + cards[i].y).setValid(validNums, validColors, validShapes);
                this.getTile((cards[i].x - 1) * 34 + cards[i].y).setValid(validNums, validColors, validShapes);
            }
            document.dispatchEvent(new CustomEvent('toRender'));
        };

        return Table;

    }(Renderer));

    return Table;

});
