define(function () {

    //noinspection UnnecessaryLocalVariableJS
    var Renderer = (function () {

        function Renderer() {
            this.drawables = [];
        }

        Renderer.prototype.draw = function (canvas) {
            for (var i = 0; i < this.drawables.length; i++) {
                this.drawables[i].draw(canvas);
            }
        };

        Renderer.prototype.addDrawable = function (drawable) {
            this.drawables.push(drawable);
        };

        return Renderer;

    }());

    return Renderer;

});
