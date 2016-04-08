define(function (require) {

    //noinspection UnnecessaryLocalVariableJS
    var OffScreenRenderer = (function () {
        //allowedImages
        function CardResponse(x, y, number, color, shape) {
            this.x = x;
            this.y = y;
            this.number = number;
            this.color = color;
            this.shape = shape;
        }

        return CardResponse;

    }());

    return OffScreenRenderer;

});
