define(function (require) {

    var OffScreenRenderer = require('./off_screen_renderer'),
        ScreenRenderer = require('./screen_renderer'),
        Camera = require('./camera'),
        Table = require('./table'),
        Hand = require('./hand'),
        CardResponse = require('./card_response'),
        user = require('models/session'),
        Score = require('./score');

    return function (gameModel) {
        var TABLE_SIZE = 3400;
        var offScreenCanvas = document.createElement('canvas'), offScreenRenderer = new OffScreenRenderer(offScreenCanvas, TABLE_SIZE, TABLE_SIZE), screenCanvas = document.getElementById('canvas');

        screenCanvas.width = window.innerWidth;
        screenCanvas.height = window.innerHeight;

        var table = new Table(34, 34, 100, 100), hand = new Hand(screenCanvas);

        //table.update([new CardResponse(16, 16, '4', 'r', 'x')]);

        /*
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
        */
        offScreenRenderer.addDrawable(table);
        offScreenRenderer.render();

        var screenRenderer = new ScreenRenderer(screenCanvas, new Camera(offScreenCanvas, TABLE_SIZE / 2 - window.innerWidth / 2, TABLE_SIZE / 2 - window.innerHeight / 2, window.innerWidth, window.innerHeight), table, offScreenRenderer, hand);

        var score1 = new Score(10, 30, 100, 100, "", 0),
            score2 = new Score(10, 60, 100, 100, "", 0),
            scores = [0, 0];

        screenRenderer.addDrawable(score1);
        screenRenderer.addDrawable(score2);

        screenRenderer.render();

        document.addEventListener('cardPlaced', function (event) {

            //console.log('CARD PLACED');
            console.log(gameModel);
            gameModel.get('table').push(event.detail);
            //console.log(gameModel.get('table'));
            gameModel.update();
        });

        var prevHand = null;
        gameModel.on('sync', function () {
            console.log('SYNC');
            var update = [];
            var tbl = gameModel.get('table');
            // number, color, shape
            for (var i = 0; i < tbl.length; i++) {
                update.push(new CardResponse(tbl[i].x, tbl[i].y, tbl[i].card.value, tbl[i].card.color, tbl[i].card.shape));
            }
            table.update(update);

            var user_id = user.get('id');
            var players = gameModel.get('players');

            var h = [];
            for (var k = 0; k < players.length; k++)
            {
                if (k == 0) {
                    score1.update(players[k].name, scores[k]);
                } else {
                    score2.update(players[k].name, scores[k]);
                }
                console.log(user_id + ' ' + players[k].id);
                if (players[k].id == user_id) {
                    for (var j = 0; j < players[k]['cards'].length; j++) {
                        h.push(new CardResponse(0, 0, players[k]['cards'][j].value, players[k]['cards'][j].color, players[k]['cards'][j].shape));
                    }
                }
            }
            console.log(h);
            //console.log("HAND: " + prevHand.size() + ' ' + hand.size());
            if (prevHand == null || prevHand.length != hand.size()) {
                prevHand = h;
                hand.update(h);
            }
        });

        setInterval(function () {
            gameModel.read();
            offScreenRenderer.render();
            screenRenderer.render();
        }, 1000);
    };
});