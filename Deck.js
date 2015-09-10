var Deck = function () {
    var cardArray = [];
    var me = this;
    //var drawn = [];  Not needed as the deck is randomized initially. That is better than my idea would have been.

    function initCards() {
        /*initialize cards and their types*/
        cardArray = [];
        for (var i = 0; i < 4; i++) {
            var type = "";
            switch (i) {
                case 0:
                    type = "heart";
                    break;
                case 1:
                    type = "diamond";
                    break;
                case 2:
                    type = "spade";
                    break;
                default:
                    type = "club";
            }
            for (var j = 1; j <= 13; j++) {
                cardArray.push(new Card({suit: type, value: j}))
            }
        }
        /*end init*/

        //shuffle new deck
        me.shuffle();
    }

    me.shuffle = function() {
        var o = cardArray;
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    me.deal = function (players) {
        //players is an array of people to deal to
        //each player is given a card face down, then one face up
        for (var i in players) {
            var firstCard = cardArray.pop();
            firstCard.setVisible(true);
            players[i].currHand = new Hand(firstCard);
        }
        for (var i in players) {
            var secondCard = cardArray.pop();
            players[i].currHand.addCard(secondCard);
        }
    };
    me.hit = function (hand) {
        hand.addCard(me.getCard());
    };
    me.getCard = function () {
        var card = cardArray.pop();
        card.setVisible();
        return card;
    };
    me.showCards = function () {
        return cardArray;
    };

    me.checkCardCount = function() {
        if(cardArray.length <= 10) {
            initCards();
        }
    };

    //init new instance of deck
    initCards();
};