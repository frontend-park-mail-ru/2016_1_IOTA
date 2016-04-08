define(function (require) {

    var __extends = require('./extends');

    //noinspection UnnecessaryLocalVariableJS
    var Score = (function (_super) {

        __extends(Score, _super);

        function Score(x, y, width, height, name, score) {
            _super.call(this, x, y, width, height);
            this.name = name;
            this.score = score;
        }

        Score.prototype.update = function (score) {
            this.score = score;
        };

        Score.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            context.font = "30px Verdana";
            context.fillText(this.name + ': ' + this.score, this.x, this.y, this.width);
        };

        return Score;

    }(Sprite));

    return Score;

});
