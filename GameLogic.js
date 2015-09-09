function extend(obj1, obj2) {
    for (key in obj1) {
        obj1[key] = obj2[key];
    }
};

var Game = function (startMoney) {
    /** default variables **/
    if (typeof startMoney == "undefined")
        startMoney = 1000;

    /** private object declarations **/
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
            return cardArray.pop();
        };
        this.showCards = function () {
            return cardArray;
        };

        //shuffle new instance of deck
        this.shuffle();
    };

    var Hand = function (card) {
        var hand = [card];

        this.addCard = function (card) {
            hand.push(card);
        };
        this.split = function () {
            /////// ?
        };
        this.total = function () {
            // returns total value of cards in an array
            // if an ace is present, will return 2 values in an array
            var total = 0;
            var total2 = 0;
            for (var i in hand) {
                var card = hand[i];
                //higher total if needed
                if (total2 > 0 && card.value != "ace") {
                    total2 += card.pointValue;
                } else if (card.value == "ace") {
                    total2 += 11;
                }
                //regular total
                total += card.pointValue;

                if (total2 > 0)
                    return [total, total2];
                else
                    return [total];
            }
        };
        this.toString = function () {
            var str = "\n";
            for (var i in hand) {
                str += hand[i].toString() + "\n";
            }
            return str;
        };
    };

    var Dealer = function () {
        this.currHand = null;
        this.play = function () {
            //logic for playing on current hand:
            //stay, split, hit
        };
    };

    var Player = function () {
        this.currHand = null;
    };

    var Card = function (obj) {
        if (!obj) {
            var obj = {};
        }
        var value = obj.value || "",
            pointValue = 0,
            suit = obj.suit || "",
            visible = false;

        switch (value) {
            case 1:
                value = "ace";
                pointValue = 1;
                break;
            case 11:
                value = "jack";
                pointValue = 10;
                break;
            case 12:
                value = "queen";
                pointValue = 10;
                break;
            case 13:
                value = "king";
                pointValue = 10;
                break;
            default:
                pointValue = value;
                value = value + "";
        }

        this.suit = suit;
        this.value = value;
        this.visible = visible || false;
        this.pointValue = pointValue;
        this.toString = function () {
            if (this.visible)
                return this.value + " of " + this.suit + "s";
            return "unknown";
        };
        this.setVisible = function (value) {
            if (typeof value == "undefined") value = true;
            this.visible = value;
        };
    };
    /** end object declarations **/

    /** add all the handlers to connect game object and UI **/
    function initHandlers() {
        //e.g. document.getElementById('blah').onclick = function() {};
    }

    /** defined same start routine **/
    function runGame() {
        initHandlers();

        var deck = new Deck();

        var players = [];
        var me = new Player();
        var dealer = new Dealer();
        players.push(me);
        players.push(dealer);

        deck.deal(players);
        console.log("your current hand is:", me.currHand.toString());
        console.log("dealer hand is:", dealer.currHand.toString());
    };

    /**start the game when a new object is initialized**/
    runGame();
};

//start a new game
var game = new Game();
