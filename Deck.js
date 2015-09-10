var Deck = function () {
    var cardArray = [];
    var publicVar = this;

    //initializes a brand new deck and shuffles it
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
        publicVar.shuffle();
    }

    //shuffles the card array
    publicVar.shuffle = function() {
        var o = cardArray;
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    //deals cards, one at a tipublicVar to each player. The first card is face up and the second is face down
    publicVar.deal = function (players) {
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

    //take a card off the deck, then put it into a hand
    publicVar.hit = function (hand) {
        hand.addCard(publicVar.getCard());
    };

    //gives a card from the cardArray, makes it visible, then returns the card
    publicVar.getCard = function () {
        var card = cardArray.pop();
        card.setVisible();
        return card;
    };

    //outputs a listing of all the cards in the current deck. helper function for debugging
    publicVar.showCards = function () {
        return cardArray;
    };

    //checks to see if 10 or less cards in the deck, if so, we just shuffle a new deck
    publicVar.checkCardCount = function() {
        if(cardArray.length <= 10) {
            initCards();
        }
    };

    //init new instance of deck
    initCards();
};