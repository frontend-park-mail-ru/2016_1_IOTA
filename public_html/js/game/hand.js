define(function (require) {

    var __extends = require('./extends'),
        Renderer = require( './renderer'),
        Card = require('./card');

    //noinspection UnnecessaryLocalVariableJS
    var Hand = (function (_super) {

        __extends(Hand, _super);

        function Hand() {
            _super.apply(this, arguments);
        }

        Hand.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            new Card(canvas.width / 2 - 230, canvas.height - 150, 100, 100).draw(canvas);
            new Card(canvas.width / 2 - 110, canvas.height - 150, 100, 100).draw(canvas);
            new Card(canvas.width / 2 + 130, canvas.height - 150, 100, 100).draw(canvas);
            new Card(canvas.width / 2 + 10, canvas.height - 150, 100, 100).draw(canvas);
        };

        return Hand;

    }(Renderer));

    return Hand;

});
