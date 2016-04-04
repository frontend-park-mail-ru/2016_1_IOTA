define(function (require) {

    var __extends = require('./extends'),
        Renderer = require( './renderer'),
        Card = require('./card');

    //noinspection UnnecessaryLocalVariableJS
    var Hand = (function (_super) {

        __extends(Hand, _super);

        function Hand(canvas) {
            _super.call(this);
            var image = new Image();
            image.src = '/images/rc1.png';
            this.drawables.push(new Card(canvas.width / 2 - 230, canvas.height - 150, 100, 100, true, image));
            image = new Image();
            image.src = '/images/gt2.png';
            this.drawables.push(new Card(canvas.width / 2 - 110, canvas.height - 150, 100, 100, true, image));
            image = new Image();
            image.src = '/images/yx3.png';
            this.drawables.push(new Card(canvas.width / 2 + 130, canvas.height - 150, 100, 100, true, image));
            image = new Image();
            image.src = '/images/br4.png';
            this.drawables.push(new Card(canvas.width / 2 + 10, canvas.height - 150, 100, 100, true, image));
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

        return Hand;

    }(Renderer));

    return Hand;

});
