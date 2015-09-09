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
                str += hand[i].toString() + "<br>";
            }
            return str;
        };
    };

    var Dealer = function () {
        var privateVar = "";

        var publicObj = {};
        var cardNumber = 0;
        var nextCard = cardArray.pop();
        var endHand = false;
        dealerTotal = Dealer.firstCard.pointValue + Dealer.secondCard.pointValue;


        return publicObj;
        this.currHand = null;
        this.play = function () {
            while (total < 17) {
                Dealer.currHand.addCard(nextCard);
                total = total + nextCard.pointValue;
            }
            if (DealerTotal > 17 && DealerTotal <= 21) {
                if (DealerTotal > PlayerTotal) {
                    alert("Dealer Wins");
                    endHand = true;
                }
                else (dealerTotal == playerTotal)
                {
                    alert("Push");
                    endHand = true;
                }
            }
            if (dealerTotal > 21) {
                alert("You Win!!");
                endHand = true;
            }
        };
    };

    var Player = function () {
        this.currHand = null;
        this.currMoney = 1000;

        this.bet = function(amount) {
            if(currMoney - amount < 1) {
                alert('You broke with that bet!');
                return false;
            } else {
                currMoney -= amount;
                return true;
            }
            /*
            if (endHand == true) {
                alert("Hand is over, place bets and deal again!");
            } else {
                cardNumber = playerHand.length;
                cardScore(playerHand) += card.pointValue;
                total = cardScore(playerHand);
            }
            if (total > 21) {
                alert(dealerTotal + alert(" busted!"));
                startMoney = startMoney - bet;
                endHand = true;
            } else {
                startMoney = startMoney + bet;
            }
            if (total > 0 && card.value != "ace") {
                total += card.pointValue;
            } else if (card.value == "ace") {
                total += 11;
            }*/
        }
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

    var els = {
        money_label: document.getElementById('money_label'),
        starting_amount: document.getElementById('starting'),
        bet_amount: document.getElementById('bet_amount'),
        player_cont: document.getElementById('player'),
        dealer_cont: document.getElementById('dealer'),
        hit: document.getElementById('hit'),
        stay: document.getElementById('stay'),
        bet: document.getElementById('bet')
    };

    /** defined same start routine **/
    function runGame() {
        var deck = new Deck();

        var players = [];
        var me = new Player();
        var dealer = new Dealer();
        players.push(me);
        players.push(dealer);

        els.bet.onclick = function() {
            if(!els.bet_amount.value) {
                alert('please input an amount to bet');
            } else {
                els.money_label.innerHTML = "Current Money";
                els.starting_amount.disabled = "disabled";
                if(me.bet()) {
                    deck.deal(players);
                    for(var i in me.currHand) {
                        me.currHand[i].setVisible();
                    }
                    els.starting_amount.value = me.currMoney;
                }
                els.player_cont.innerHTML = me.currHand.toString();
                els.dealer_cont.innerHTML = dealer.currHand.toString();
                els.bet.disabled = "disabled";
                els.bet_amount.disabled = "disabled";
            }
        };
        els.hit.onclick = function() {
            deck.hit(me.currHand);
        };
        els.stay.onclick = function() {
            alert('stay button clicked');
        };

        /*deck.deal(players);
        console.log("your current hand is:", me.currHand.toString());
        console.log("dealer hand is:", dealer.currHand.toString());*/
    };

    /**start the game when a new object is initialized**/
    runGame();
};

//start a new game
window.onload = function() {
    var game = new Game();
}
