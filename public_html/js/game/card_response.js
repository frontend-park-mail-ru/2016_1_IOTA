define(function (require) {

    //noinspection UnnecessaryLocalVariableJS
    var OffScreenRenderer = (function () {
        //allowedImages
        function CardResponse(x, y, number, color, shape, concrete, uuid) {
            //console.log(JSON.stringify(uuid));
            this.x = x;
            this.y = y;
            this.number = number;
            this.color = color;
            this.shape = shape;
            this.concrete = concrete;
            this.uuid = uuid;
        }

        return CardResponse;

    }());

    return OffScreenRenderer;

});
