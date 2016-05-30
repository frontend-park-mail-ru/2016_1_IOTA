define(function (require) {

    var OffScreenRenderer = require('./off_screen_renderer'),
        ScreenRenderer = require('./screen_renderer'),
        Camera = require('./camera'),
        Table = require('./table'),
        Hand = require('./hand'),
        CardResponse = require('./card_response'),
        user = require('models/session'),
        Score = require('./score'),
        $ = require('jquery');

    return function (gameModel) {
        $('#loader').hide();
        $('#canvas').show();
        var TABLE_SIZE = 3400;
        var offScreenCanvas = document.createElement('canvas'),
            offScreenRenderer = new OffScreenRenderer(offScreenCanvas, TABLE_SIZE, TABLE_SIZE),
            screenCanvas = document.getElementById('canvas');

        screenCanvas.width = $('#canvas').width();
        screenCanvas.height = $('#canvas').height();

        var table = new Table(34, 34, 100, 100),
            hand = new Hand(screenCanvas);

        //table.update([new CardResponse(16, 16, '4', 'r', 'x')]);

        offScreenRenderer.addDrawable(table);
        offScreenRenderer.render();

        var screenRenderer = new ScreenRenderer(screenCanvas, new Camera(offScreenCanvas, TABLE_SIZE / 2 - $('#canvas').width() / 2, TABLE_SIZE / 2 - $('#canvas').height() / 2, $('#canvas').width(), $('#canvas').height()), table, offScreenRenderer, hand);

        /*var score1 = new Score(10, 30, 100, 100, "lol", 0),
            score2 = new Score(10, 60, 100, 100, "", 0),
            scores = [0, 0];*/

        //screenRenderer.addDrawable(score1);
        //screenRenderer.addDrawable(score2);

        screenRenderer.render();

        document.addEventListener('cardPlaced', function (event) {

            console.log('CARD PLACED');
            console.log(gameModel);
            console.log(JSON.stringify(event.detail));
            table.update([new CardResponse(event.detail.x, event.detail.y, event.detail.card.value, event.detail.card.color, event.detail.card.shape, event.detail.card.concrete)]);
            //meModel.get('table').push(event.detail);
            //console.log(gameModel.get('table'));
            //gameModel.update();
        });
        var prevHand = null;
        gameModel.on('sync', function () {
            //console.log('SYNC');
            table.setStep(user.get('ref') == gameModel.message.ref);
            var i = 0;
            var j = 0;
            for(j = 0; j < gameModel.message.players.length; j++) {
                tempPlayer = gameModel.message.players[j];
                if(tempPlayer.ref == user.get('ref')) {
                    var cardHand = [];
                    for(i = 0; i < tempPlayer.hand.length; i++) {
                        cardPull = tempPlayer.hand[i];
                        console.log(JSON.stringify(cardPull));
                        if(cardPull.concrete) {
                            cardPullNumber = "1";
                            switch (cardPull.number) {
                                case "ONE": cardPullNumber = "1"; break;
                                case "TWO": cardPullNumber = "2"; break;
                                case "THREE": cardPullNumber = "3"; break;
                                case "FOUR": cardPullNumber = "4"; break;
                            }
                            cardHand.push(new CardResponse(0, 0, cardPullNumber, cardPull.color[0].toLowerCase(), cardPull.shape[0].toLowerCase(), ""));
                        } else {
                            cardHand.push(new CardResponse(0, 0, "", "", "", "super"));
                        }
                    }
                    hand.update(cardHand);
                }
            }
            for(i = 0; i < gameModel.message.field.length; i++) {
                cardPull = gameModel.message.field[i];
                //console.log(JSON.stringify(cardPull));
                if(cardPull.item.concrete) {
                    cardPullNumber = "1";
                    switch (cardPull.item.number) {
                        case "ONE": cardPullNumber = "1"; break;
                        case "TWO": cardPullNumber = "2"; break;
                        case "THREE": cardPullNumber = "3"; break;
                        case "FOUR": cardPullNumber = "4"; break;
                    }
                    table.update([new CardResponse(16 + cardPull.offx, 16 + cardPull.offy, cardPullNumber, cardPull.item.color[0].toLowerCase(), cardPull.item.shape[0].toLowerCase(), "")]);
                } else {
                    table.update([new CardResponse(16 + cardPull.offx, 16 + cardPull.offy, "", "", "", "super")]);
                }
            }
            /*var update = [];
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
            }*/
        });
        document.addEventListener('toRender', function (event) {
            console.log("Painted");
            offScreenRenderer.render();
            screenRenderer.render();
        });
    };
});