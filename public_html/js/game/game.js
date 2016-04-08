define(function (require) {

    var OffScreenRenderer = require('./off_screen_renderer'),
        ScreenRenderer = require('./screen_renderer'),
        Camera = require('./camera'),
        Table = require('./table'),
        Hand = require('./hand'),
        CardResponse = require('./card_response');

    return function () {
        var TABLE_SIZE = 3400;
        var offScreenCanvas = document.createElement('canvas'), offScreenRenderer = new OffScreenRenderer(offScreenCanvas, TABLE_SIZE, TABLE_SIZE), screenCanvas = document.getElementById('canvas');

        screenCanvas.width = window.innerWidth;
        screenCanvas.height = window.innerHeight;

        var table = new Table(34, 34, 100, 100), hand = new Hand(screenCanvas);

        table.update([new CardResponse(16, 16, '4', 'r', 'x')]);

        hand.update([
            new CardResponse(0, 0, '3', 'y', 't'),
            new CardResponse(0, 0, '1', 'r', 'x'),
            new CardResponse(0, 0, '2', 'g', 'c'),
            new CardResponse(0, 0, '4', 'b', 'r')
        ]);

        var validNums = ['1', '2', '3', '4'];
        var validColors = ['y', 'r', 'g', 'b'];
        var validShapes = ['r', 't', 'c', 'x'];

        table.getTile(16 * 34 + 15).setValid(validNums, validColors, validShapes);
        table.getTile(16 * 34 + 17).setValid(validNums, validColors, validShapes);
        table.getTile(15 * 34 + 16).setValid(validNums, validColors, validShapes);
        table.getTile(17 * 34 + 16).setValid(validNums, validColors, validShapes);

        offScreenRenderer.addDrawable(table);
        offScreenRenderer.render();

        var screenRenderer = new ScreenRenderer(screenCanvas, new Camera(offScreenCanvas, TABLE_SIZE / 2 - window.innerWidth / 2, TABLE_SIZE / 2 - window.innerHeight / 2, window.innerWidth, window.innerHeight), table, offScreenRenderer, hand);
        //screenRenderer.addDrawable(new Score(10, 30, 100, 100, "Vasya", 10));
        screenRenderer.render();
    };
});