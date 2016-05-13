define(function (require) {

    var __extends = require('./extends'),
        Renderer = require( './renderer'),
        Card = require('./card');

    //noinspection UnnecessaryLocalVariableJS
    var Hand = (function (_super) {

        __extends(Hand, _super);

        function Hand(canvas) {
            _super.call(this);
            this.canvas = canvas;
        }

        Hand.prototype.getCard = function (x, y) {
            for (var i = 0; i < this.drawables.length; i++) {
                if (this.drawables[i].contains(x, y) && this.drawables[i].getInHand()) {
                    return this.drawables[i];
                }
            }
            return null;
        };

        Hand.prototype.draw = function (canvas) {
            for (var i = 0; i < this.drawables.length; i++) {
                if (this.drawables[i].getInHand()) {
                    this.drawables[i].draw(canvas);
                }
            }
        };

        Hand.prototype.update = function (cards) {
            var coord = [
                [this.canvas.width / 2 - 230, this.canvas.height - 150],
                [this.canvas.width / 2 - 110, this.canvas.height - 150],
                [this.canvas.width / 2 + 130, this.canvas.height - 150],
                [this.canvas.width / 2 + 10, this.canvas.height - 150]
            ];
            this.drawables = [];
            for (var i = 0; i < cards.length; i++) {
                this.drawables.push(new Card(coord[i][0], coord[i][1], 100, 100, cards[i].number, cards[i].color, cards[i].shape, true));
            }
        };

        Hand.prototype.size = function () {
            var count = 0;
            for (var i = 0; i < this.drawables.length; i++) {
                if (this.drawables[i].getInHand()) {
                    count++;
                }

            }
            return count;
        };

        return Hand;

    }(Renderer));

    return Hand;

});
