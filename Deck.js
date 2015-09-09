var Deck = function () {
    var cardArray = [];
    //var drawn = [];  Not needed as the deck is randomized initially. That is better than my idea would have been.

    /*initialize cards and their types*/
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

    this.shuffle = function () {
        var o = cardArray;
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    this.deal = function (players) {
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
    this.hit = function (hand) {
        hand.addCard(this.getCard());
    };
    this.getCard = function () {
        var card = cardArray.pop();
        card.setVisible();
        return card;
    };
    this.showCards = function () {
        return cardArray;
    };

    //shuffle new instance of deck
    this.shuffle();
};