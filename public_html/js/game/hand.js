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
            var heightCard = $('#canvas').height() / 10;
            var coord = [
                [this.canvas.width - 10 - heightCard, this.canvas.height - heightCard - 10],
                [this.canvas.width - 20 - 2 * heightCard, this.canvas.height - heightCard - 10],
                [this.canvas.width - 30 - 3 * heightCard, this.canvas.height - heightCard - 10],
                [this.canvas.width - 40 - 4 * heightCard, this.canvas.height - heightCard - 10]
            ];
            this.drawables = [];
            for (var i = 0; i < cards.length; i++) {
                this.drawables.push(new Card(coord[i][0], coord[i][1], heightCard, heightCard, cards[i].number, cards[i].color, cards[i].shape, true, cards[i].concrete, cards[i].uuid));
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

        Hand.prototype.initSize = function () {
            var heightCard = $('#canvas').height() / 10;
            console.log(heightCard);
        };

        return Hand;

    }(Renderer));

    return Hand;

});
