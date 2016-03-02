define([
    './off_screen_renderer',
    './screen_renderer',
    './camera',
    './table',
    './hand'
], function (
    OffScreenRenderer,
    ScreenRenderer,
    Camera,
    Table,
    Hand
) {
    /*
    var __extends = (this && this.__extends) || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    var Sprite = (function () {
        function Sprite(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        Sprite.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            context.fillRect(this.x, this.y, this.width, this.height);
        };
        return Sprite;
    }());
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
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(world, x, y, width, height) {
            _super.call(this, x, y, width, height);
            this.world = world;
        }

        Camera.prototype.scale = function (scale, clientX, clientY) {
            var oldWidth = this.width, oldHeight = this.height;
            this.width *= scale;
            this.height *= scale;
            this.x += (oldWidth - this.width) * (clientX / this.world.width);
            this.y += (oldHeight - this.height) * (clientY / this.world.height);
        };
        Camera.prototype.scroll = function (deltaX, deltaY) {
            var newX = this.x + deltaX, newY = this.y + deltaY;
            if (newX > 0 && newX < this.world.width) {
                this.x = newX;
            }
            if (newY > 0 && newY < this.world.height) {
                this.y = newY;
            }
        };
        Camera.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            console.log(this.world, this.x, this.y, this.width, this.height, 0, 0, canvas.width, canvas.height);
            context.drawImage(this.world, this.x, this.y, this.width, this.height, 0, 0, canvas.width, canvas.height);
        };
        return Camera;
    }(Sprite));
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            _super.apply(this, arguments);
        }

        return Card;
    }(Sprite));
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(x, y, width, height) {
            _super.call(this, x, y, width, height);
        }

        Tile.prototype.draw = function (canvas) {
            if (this.content) {
                this.content.draw(canvas);
            }
            else {
                var context = canvas.getContext('2d');
                context.strokeRect(this.x, this.y, this.width, this.height);
            }
        };
        return Tile;
    }(Sprite));
    var Table = (function (_super) {
        __extends(Table, _super);
        function Table(rows, columns, tileWidth, tileHeight) {
            _super.call(this);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    this.drawables.push(new Tile(i * tileWidth, j * tileHeight, tileWidth, tileHeight));
                }
            }
        }

        Table.prototype.draw = function (canvas) {
            for (var i = 0; i < this.drawables.length; i++) {
                this.drawables[i].draw(canvas);
            }
        };
        return Table;
    }(Renderer));
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
    */

    return function () {
        var table = document.createElement('canvas'),
            offScreenRenderer = new OffScreenRenderer(table, 3400, 3400),
            screenRenderer = new ScreenRenderer(document.getElementById('canvas'),
                new Camera(table, 0, 0, window.innerWidth, window.innerHeight), window.innerWidth, window.innerHeight);

        offScreenRenderer.addDrawable(new Table(34, 34, 100, 100));
        offScreenRenderer.render();

        screenRenderer.addDrawable(new Hand());
        screenRenderer.render();
    };
});