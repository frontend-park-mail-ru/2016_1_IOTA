define([
    './extends',
    './renderer'
], function (
    __extends,
    Renderer
) {

    var ScreenRenderer = (function (_super) {
        __extends(ScreenRenderer, _super);
        function ScreenRenderer(canvas, camera, width, height) {
            var _this = this;
            _super.call(this);
            canvas.width = width;
            canvas.height = height;
            canvas.onmousedown = function (event) {
                _this.isScroll = true;
                _this.prevX = event.clientX;
                _this.prevY = event.clientY;
            };
            canvas.onmouseup = function (event) {
                _this.isScroll = false;
            };
            canvas.onmousemove = function (event) {
                if (_this.isScroll) {
                    _this.camera.scroll(_this.prevX - event.clientX, _this.prevY - event.clientY);
                    _this.prevX = event.clientX;
                    _this.prevY = event.clientY;
                    _this.clear();
                    _this.render();
                }
            };
            this.canvas = canvas;
            this.drawables.push(camera);
            this.camera = camera;
        }

        ScreenRenderer.prototype.render = function () {
            _super.prototype.draw.call(this, this.canvas);
        };
        ScreenRenderer.prototype.clear = function () {
            var context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        return ScreenRenderer;
    }(Renderer));

    return ScreenRenderer;

});
