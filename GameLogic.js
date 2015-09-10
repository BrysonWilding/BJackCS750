/** defined same start routine **/
function runGame() {
    var els = {
        money_label: document.getElementById('money_label'),
        starting_amount: document.getElementById('starting'),
        bet_amount: document.getElementById('bet_amount'),
        player_cont: document.getElementById('player'),
        dealer_cont: document.getElementById('dealer'),
        hit: document.getElementById('hit'),
        stay: document.getElementById('stay'),
        bet: document.getElementById('bet'),
        player_score: document.getElementById('player_score')
    };


    var deck = new Deck();

    var players = [];
    var me = new Player();
    var dealer = new Dealer();
    players.push(me);
    players.push(dealer);

    function resetUI() {
        els.player_cont.innerHTML = "";
        els.dealer_cont.innerHTML = "";
        els.bet.removeAttribute("disabled");
        els.bet_amount.removeAttribute("disabled");
        els.player_score.innerHTML = "";
        els.hit.disabled = "disabled";
        els.stay.disabled = "disabled";
    }

    els.bet.onclick = function() {
        if(!els.bet_amount.value) {
            alert('please input an amount to bet');
        } else {
            els.money_label.innerHTML = "Current Money";
            els.starting_amount.disabled = "disabled";
            if(me.bet(parseInt(els.bet_amount.value))) {
                deck.deal(players);
                me.currHand.setAllVisible();
                els.starting_amount.value = me.currMoney;
                els.hit.removeAttribute("disabled");
                els.stay.removeAttribute("disabled");
                els.player_score.innerHTML = me.currHand.total().toString();
                els.bet.disabled = "disabled";
                els.bet_amount.disabled = "disabled";
                els.player_cont.innerHTML = me.currHand.toString();
                els.dealer_cont.innerHTML = dealer.currHand.toString();
            }
        }
    };
    els.hit.onclick = function() {
        deck.hit(me.currHand);

        var totals = me.currHand.total();
        els.player_cont.innerHTML = me.currHand.toString();
        els.dealer_cont.innerHTML = dealer.currHand.toString();
        els.player_score.innerHTML = totals.toString();
        var bustFlag = true;
        for(var i in totals) {
            if(totals[i] < 22)
                bustFlag = false;
            else if(totals[i] == 21) {
                alert("Blackjack!! You win!");
                me.wonHand();
                resetUI();
            }
        }
        if(bustFlag) {
            alert("You bust! :(");
            resetUI();
        }

        els.starting_amount.value = me.currMoney;
    };
    els.stay.onclick = function() {
        dealer.play(deck);

        dealer.currHand.setAllVisible();
        els.dealer_cont.innerHTML = dealer.currHand.toString();

        var dealer_high = dealer.currHand.highestValidScore();
        var player_high = me.currHand.highestValidScore();
        if(dealer_high > 21 || dealer_high == -1) {
            alert("You Win! Dealer busts.");
            me.wonHand();
        } else if(dealer_high == 21) {
            alert("You lose. The dealer got blackjack.");
        } else if (player_high >= dealer_high) {
            alert("You win! Dealer's score was " + dealer_high +".");
            me.wonHand();
        } else if (player_high < dealer_high) {
            alert("You lost. The dealer's hand was larger than yours at "+dealer_high+".");
        }

        resetUI();

        els.starting_amount.value = me.currMoney;
    };

    /*deck.deal(players);
    console.log("your current hand is:", me.currHand.toString());
    console.log("dealer hand is:", dealer.currHand.toString());*/
};

//start a new game
window.onload = function() {
    /**start the game when a new object is initialized**/
    runGame();
}
