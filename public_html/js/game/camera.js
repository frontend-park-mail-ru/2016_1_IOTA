define([
    './extends',
    './sprite'
], function (
    __extends,
    Sprite
) {

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

    return Camera;

});
