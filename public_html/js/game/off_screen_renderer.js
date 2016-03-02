define([
    './extends',
    './renderer'
], function (
    __extends,
    Renderer
) {

    var OffScreenRenderer = (function (_super) {
        __extends(OffScreenRenderer, _super);
        function OffScreenRenderer(canvas, width, height) {
            _super.call(this);
            canvas.width = width;
            canvas.height = height;
            this.canvas = canvas;
        }

        OffScreenRenderer.prototype.render = function () {
            _super.prototype.draw.call(this, this.canvas);
        };
        return OffScreenRenderer;
    }(Renderer));

    return OffScreenRenderer;

});
