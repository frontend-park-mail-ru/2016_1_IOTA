define(function (require) {

    var OffScreenRenderer = require('./off_screen_renderer'),
        ScreenRenderer = require('./screen_renderer'),
        Camera = require('./camera'),
        Table = require('./table'),
        Hand = require('./hand'),
        CardResponse = require('./card_response'),
        user = require('models/session'),
        Sprite = require('./sprite')
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

        hand.reSize();

        offScreenRenderer.addDrawable(table);
        offScreenRenderer.render();

        var screenRenderer = new ScreenRenderer(screenCanvas, new Camera(offScreenCanvas, TABLE_SIZE / 2 - $('#canvas').width() / 2, TABLE_SIZE / 2 - $('#canvas').height() / 2, $('#canvas').width(), $('#canvas').height()), table, offScreenRenderer, hand);

         window.onresize = function(e) {
             screenCanvas.width = $('#canvas').width();
             screenCanvas.height = $('#canvas').height();
             delete screenRenderer;
             screenRenderer = new ScreenRenderer(screenCanvas, new Camera(offScreenCanvas, TABLE_SIZE / 2 - $('#canvas').width() / 2, TABLE_SIZE / 2 - $('#canvas').height() / 2, $('#canvas').width(), $('#canvas').height()), table, offScreenRenderer, hand);
             hand.reSize();
             document.dispatchEvent(new CustomEvent('toRender'));
         };

        screenRenderer.render();
        document.addEventListener('exit', function (event) {
            gameModel.clear({silent: true});
            gameModel.set('ephemeral', false, {silent: true});
            gameModel.set('endSequence', true, {silent: true});
            gameModel.set('goodbye', true, {silent: true});
            gameModel.set('__type', "PlayerPingMessage", {silent: true});
            gameModel.save([],{
                success: function(model, response, options) {
                    if(response.__ok) {
                        hand.clear();
                        table.clear();
                        $('#loader').show();
                        $('#canvas').hide();
                        $('.js-gamer1').hide();
                        $('.js-gamer2').hide();
                        $('.js-gamer3').hide();
                        $('.js-gamer4').hide();
                        window.location.href = "./#";
                    }
                }
            });
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
            gameModel.clear({silent: true});
            gameModel.set('ephemeral', false, {silent: true});
            gameModel.set('endSequence', true, {silent: true});
            gameModel.set('goodbye', false, {silent: true});
            gameModel.set('__type', "PlayerPingMessage", {silent: true});
            gameModel.save([],{
                success: function(model, response, options) {
                    //console.log("success");
                }
            });
        });
        document.addEventListener('cardPass', function (event) {
            gameModel.clear({silent: true});
            gameModel.set('ephemeral', false, {silent: true});
            gameModel.set('endSequence', false, {silent: true});
            gameModel.set('goodbye', false, {silent: true});
            gameModel.set('__type', "PlayerPassCardMessage", {silent: true});
            gameModel.set('uuid', event.detail.uuid, {silent: true});
            gameModel.save([],{
                success: function(model, response, options) {
                    if(response.__ok) {
                        document.dispatchEvent(new CustomEvent('toRender'));
                        $('.js-pass').attr('disabled','');
                    }
                }
            });
        });
        document.addEventListener('cardPlaced', function (event) {
            gameModel.clear({silent: true});
            gameModel.set('ephemeral', false, {silent: true});
            gameModel.set('endSequence', false, {silent: true});
            gameModel.set('goodbye', false, {silent: true});
            gameModel.set('__type', "PlayerPlaceCardMessage", {silent: true});
            gameModel.set('uuid', event.detail.uuid, {silent: true});
            gameModel.set('offX', event.detail.x - 16, {silent: true});
            gameModel.set('offY', event.detail.y - 16, {silent: true});
            gameModel.save([],{
                success: function(model, response, options) {
                    if(!response.__ok) {
                        event.detail.card.setInHand(true);
                        event.detail.card.setHighlightColor("black");
                        document.dispatchEvent(new CustomEvent('toRender'));
                    } else {
                        $('.js-pass').attr('disabled','');
                    }
                }
            });
        });
        gameModel.on('mess', function () {
            hand.clear();
            var message = gameModel.message;
            gameModel.message = null;
            var isChangePlayer = (true);//prevPlayer != message.ref)
            prevPlayer = message.ref;
            table.setStep(user.get('ref') == message.ref);
            if(table.getStep() && isChangePlayer)
                $('.js-pass').removeAttr('disabled');
            else
                $('.js-pass').attr('disabled', '');
            if(table.getStep()) $('.js-over').removeAttr('disabled');
            else $('.js-over').attr('disabled', '');
            var i = 0;
            var j = 0;
            var player = 1;
            for(j = 0; j < message.players.length; j++) {
                tempPlayer = message.players[j];
                if(!$('div').is('#' + tempPlayer.ref)) {
                    $('.js-gamer' + player).show();
                    $('.js-gamer' + player).attr("id", tempPlayer.ref);
                    $('.js-gamer' + player).find('.text__nick').text(tempPlayer.login);
                    player++;
                }
                if(message.ref == tempPlayer.ref) $('#' + tempPlayer.ref).addClass("text__temporary");
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
                            cardHand.push(new CardResponse(0, 0, cardPullNumber, cardPull.color[0].toLowerCase(), cardPull.shape[0].toLowerCase(), "", cardPull.uuid, cardPull.passed));
                        } else {
                            cardHand.push(new CardResponse(0, 0, "", "", "", "super", cardPull.uuid, cardPull.passed));
                        }
                    }
                    hand.update(cardHand);
                }
            }
            for(i = 0; i < message.field.length; i++) {
                cardPull = message.field[i];
                //console.log(JSON.stringify(cardPull));
                if(cardPull.item.concrete) {
                    cardPullNumber = "1";
                    switch (cardPull.item.number) {
                        case "ONE": cardPullNumber = "1"; break;
                        case "TWO": cardPullNumber = "2"; break;
                        case "THREE": cardPullNumber = "3"; break;
                        case "FOUR": cardPullNumber = "4"; break;
                    }
                    table.update([new CardResponse(16 + cardPull.offx, 16 + cardPull.offy, cardPullNumber, cardPull.item.color[0].toLowerCase(), cardPull.item.shape[0].toLowerCase(), "", cardPull.item.uuid, cardPull.item.passed)]);
                } else {
                    table.update([new CardResponse(16 + cardPull.offx, 16 + cardPull.offy, "", "", "", "super", cardPull.item.uuid, cardPull.item.passed)]);
                }
            }
        });
        document.addEventListener('toRender', function (event) {
            screenRenderer.clear();
            offScreenRenderer.render();
            screenRenderer.render();
        });
    };
});