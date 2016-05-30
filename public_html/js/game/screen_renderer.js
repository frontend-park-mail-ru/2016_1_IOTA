define(function (require) {

    var __extends = require('./extends'),
        Renderer = require('./renderer');

    //noinspection UnnecessaryLocalVariableJS
    var ScreenRenderer = (function (_super) {

        __extends(ScreenRenderer, _super);

        function ScreenRenderer(canvas, camera, table, offScreenRenderer, hand) {
            var _this = this;
            _super.call(this);
            this.table = table;
            this.offScreenRenderer = offScreenRenderer;
            this.canvas = canvas;
            this.drawables.push(camera);
            this.camera = camera;
            this.hand = hand;
            this.addDrawable(this.hand);
            canvas.onmousedown = function (event) {
                if(table.getStep()) {
                    _this.selectedCard = _this.hand.getCard(event.clientX, event.clientY-window.innerHeight/10);
                    if (_this.selectedCard != null) {
                        _this.initX = _this.selectedCard.getX();
                        _this.initY = _this.selectedCard.getY();
                        _this.isDrag = true;
                        return;
                    }
                    _this.isScroll = true;
                    _this.prevX = event.clientX;
                    _this.prevY = event.clientY-window.innerHeight/10;
                }
            };
            canvas.onmouseup = function (event) {
                _this.isScroll = false;
                if (_this.isDrag) {
                    _this.isDrag = false;
                    var update = _this.table.placeCard(_this.selectedCard, _this.camera, _this.canvas);
                    if (_this.selectedCard.getInHand()) {
                        _this.selectedCard.setX(_this.initX);
                        _this.selectedCard.setY(_this.initY);
                        _this.selectedCard.setHighlightColor("black");
                    } else {
                        console.log(update);
                        document.dispatchEvent(new CustomEvent('cardPlaced', { detail: update}));
                    }
                    _this.clear();
                    _this.render();
                }
            };
            canvas.onmousemove = function (event) {
                if (_this.isDrag) {
                    _this.selectedCard.setX(event.clientX - _this.selectedCard.getWidth() / 2);
                    _this.selectedCard.setY(event.clientY-window.innerHeight/10 - _this.selectedCard.getHeight() / 2);
                    _this.table.checkPlace(_this.selectedCard, _this.camera, _this.canvas);
                    _this.clear();
                    _this.render();
                }
                else if (_this.isScroll) {
                    _this.camera.scroll(_this.prevX - event.clientX, _this.prevY - event.clientY+window.innerHeight/10);
                    _this.prevX = event.clientX;
                    _this.prevY = event.clientY-window.innerHeight/10;
                    _this.clear();
                    _this.render();
                }
            };
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
