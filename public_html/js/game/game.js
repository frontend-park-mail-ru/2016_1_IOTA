define(function (require) {

    var BaseView = require('views/base'),
        OffScreenRenderer = require('./off_screen_renderer'),
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
        var prevPlayer = -1;

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
        document.addEventListener('exit', function (event) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/game', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            var body = {};
            body.goodbye = true;
            body.__type = "PlayerPingMessage";
            xhr.send(JSON.stringify(body));
        });
        document.addEventListener('debugConclude', function (event) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/game', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            var body = {};
            body.debugConclude = true;
            body.__type = "PlayerPingMessage";
            xhr.send(JSON.stringify(body));
        });
        document.addEventListener('over', function (event) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/game', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            var body = {};
            body.endSequence = true;
            body.__type = "PlayerPingMessage";
            xhr.send(JSON.stringify(body));
        });
        document.addEventListener('cardPass', function (event) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/game', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            var body = {};
            body.ephemeral = false;
            body.endSequence = true;
            body.goodbye = false;
            body.__type = "PlayerPassCardMessage";
            body.uuid = event.detail.card.uuid;
            xhr.send(JSON.stringify(body));
        });
        document.addEventListener('cardPlaced', function (event) {

            console.log('CARD PLACED');
            //console.log(gameModel);
            //console.log(JSON.stringify(event.detail));
            //table.update([new CardResponse(event.detail.x, event.detail.y, event.detail.card.value, event.detail.card.color, event.detail.card.shape, event.detail.card.concrete, event.detail.card.uuid)]);
            //meModel.get('table').push(event.detail);
            //console.log(gameModel.get('table'));
            var xhr = new XMLHttpRequest();

            xhr.open("POST", '/api/game', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            var body = {};
            //console.log(JSON.stringify(event.detail));
            body.uuid = event.detail.card.uuid;
            body.__type = "PlayerPlaceCardMessage";
            body.offX = event.detail.x - 16;
            body.offY = event.detail.y - 16;
            console.log(JSON.stringify(body));
            xhr.send(JSON.stringify(body));
            //gameModel.sync('create', {url:"/api/game", __type:"PlayerPlaceCardMessage", offX:event.detail.x, offY:event.detail.y, uuid:event.detail.uuid});
        });
        var prevHand = null;
        gameModel.on('sync', function () {
            if(prevPlayer != user.get('ref'))
                $('.js-pass').removeAttr('disabled');
            prevPlayer = gameModel.message.ref;
            //console.log('SYNC');
            table.setStep(user.get('ref') == gameModel.message.ref);
            var i = 0;
            var j = 0;
            var player = 1;
            for(j = 0; j < gameModel.message.players.length; j++) {
                tempPlayer = gameModel.message.players[j];
                if(!$('div').is('#' + tempPlayer.ref)) {
                    $('.js-gamer' + player).show();
                    $('.js-gamer' + player).attr("id", tempPlayer.ref);
                    $('.js-gamer' + player).find('.text__nick').text(tempPlayer.login);
                    player++;
                }
                if(gameModel.message.ref == tempPlayer.ref) $('#' + tempPlayer.ref).addClass("text__temporary");
                else $('#' + tempPlayer.ref).removeClass("text__temporary");
                $('#' + tempPlayer.ref).find('.score').text(tempPlayer.score);
                if(tempPlayer.ref == user.get('ref')) {
                    var cardHand = [];
                    for(i = 0; i < tempPlayer.hand.length; i++) {
                        cardPull = tempPlayer.hand[i];
                        //console.log(JSON.stringify(cardPull));
                        if(cardPull.concrete) {
                            cardPullNumber = "1";
                            switch (cardPull.number) {
                                case "ONE": cardPullNumber = "1"; break;
                                case "TWO": cardPullNumber = "2"; break;
                                case "THREE": cardPullNumber = "3"; break;
                                case "FOUR": cardPullNumber = "4"; break;
                            }
                            cardHand.push(new CardResponse(0, 0, cardPullNumber, cardPull.color[0].toLowerCase(), cardPull.shape[0].toLowerCase(), "", cardPull.uuid));
                        } else {
                            cardHand.push(new CardResponse(0, 0, "", "", "", "super", cardPull.uuid));
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
                    table.update([new CardResponse(16 + cardPull.offx, 16 + cardPull.offy, cardPullNumber, cardPull.item.color[0].toLowerCase(), cardPull.item.shape[0].toLowerCase(), "", cardPull.item.uuid)]);
                } else {
                    table.update([new CardResponse(16 + cardPull.offx, 16 + cardPull.offy, "", "", "", "super", cardPull.item.uuid)]);
                }
            }
        });
        document.addEventListener('toRender', function (event) {
            console.log("Painted");
            offScreenRenderer.render();
            screenRenderer.render();
        });
    };
});