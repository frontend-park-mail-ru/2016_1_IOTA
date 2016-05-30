define(function (require) {

    //noinspection UnnecessaryLocalVariableJS
    var OffScreenRenderer = (function () {
        //allowedImages
        function CardResponse(x, y, number, color, shape, concrete) {
            this.x = x;
            this.y = y;
            this.number = number;
            this.color = color;
            this.shape = shape;
            this.concrete = concrete;
        }

        return CardResponse;

    }());

    return OffScreenRenderer;

});
