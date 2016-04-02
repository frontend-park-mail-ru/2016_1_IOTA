define(function (require) {

    var OffScreenRenderer = require('./off_screen_renderer'),
        ScreenRenderer = require('./screen_renderer'),
        Camera = require('./camera'),
        Table = require('./table'),
        Card = require('./card');

    return function () {
        var TABLE_SIZE = 3400;
        var offScreenCanvas = document.createElement('canvas'),
            offScreenRenderer = new OffScreenRenderer(offScreenCanvas, TABLE_SIZE, TABLE_SIZE);
        var table = new Table(34, 34, 100, 100), initTile = table.getTile(16 * 34 + 16);
        var image = new Image();
        image.src = '/images/rx4.png';
        initTile.setContent(new Card(0, 0, 100, 100, false, image));
        image.onload = function () {
            offScreenRenderer.render();
            screenRenderer.render();
        };
        var allValid = [1, 2, 3, 4];
        table.getTile(16 * 34 + 15).setValid(allValid, allValid, allValid);
        table.getTile(16 * 34 + 17).setValid(allValid, allValid, allValid);
        table.getTile(15 * 34 + 16).setValid(allValid, allValid, allValid);
        table.getTile(17 * 34 + 16).setValid(allValid, allValid, allValid);
        offScreenRenderer.addDrawable(table);
        offScreenRenderer.render();
        console.log(document.getElementById('canvas'));
        var screenRenderer = new ScreenRenderer(document.getElementById('canvas'),
            new Camera(offScreenCanvas, TABLE_SIZE / 2 - window.innerWidth / 2,
                TABLE_SIZE / 2 - window.innerHeight / 2, window.innerWidth, window.innerHeight),
            table, offScreenRenderer, window.innerWidth, window.innerHeight);
        screenRenderer.render();
    };
});