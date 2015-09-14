/** defined same start routine **/
function runGame() {

    // Overriding alert because the standard one is annoying
    window.alert = function(content, button) {
        if (button === "" || button === null || typeof button == 'undefined') button = "Okay";
        els.modal_content.textContent = content;
        els.modal_button.textContent = button;
        $('#modal1').openModal();
    };

    //object to contain references to html elements
    var els = {
        money_label: document.getElementById('money_label'),
        starting_amount: document.getElementById('starting'),
        bet_amount: document.getElementById('bet_amount'),
        player_cont: document.getElementById('player'),
        dealer_cont: document.getElementById('dealer'),
        hit: document.getElementById('hit'),
        stay: document.getElementById('stay'),
        bet: document.getElementById('bet'),
        player_score: document.getElementById('player_score'),
        dealer_score: document.getElementById('dealer_score'),
        modal: document.querySelector("#modal1"),
        modal_content: document.querySelector("#modal-content"),
        modal_button: document.querySelector(".modal-close")
    };

    //init the first deck
    var deck = new Deck();

    //init the players - this could potentially allow more than 2 players in the future
    var players = [];
    var me = new Player();
    var dealer = new Dealer();
    players.push(me);
    players.push(dealer);

    //function to reset all of the UI elements after a round is over
    function resetUI() {
        els.player_cont.innerHTML = "";
        els.dealer_cont.innerHTML = "";
        els.bet.removeAttribute("disabled");
        els.bet_amount.removeAttribute("disabled");
        els.player_score.innerHTML = "";
        els.dealer_score.innerHTML = "";
        els.hit.disabled = "disabled";
        els.stay.disabled = "disabled";
    }

    /** this is the actions to take on the "bet" button **/
    els.bet.onclick = function() {
        //check for empty bet field
        if(!els.bet_amount.value) {
            alert('please input an amount to bet');
        } else {
            //disable the starting money as they cannot change it once the game is started
            els.money_label.innerHTML = "Current Money";
            els.starting_amount.disabled = "disabled";

            //check if the bet is valid. If so, continue with game play
            if(me.bet(parseInt(els.bet_amount.value))) {
                //check if we need to get out a new deck
                deck.checkCardCount();
                //deal the deck to all players
                deck.deal(players);
                //make all of the player's card visible to the user
                me.currHand.setAllVisible();

                //set various field values
                els.starting_amount.value = me.currMoney;
                els.hit.removeAttribute("disabled");
                els.stay.removeAttribute("disabled");
                els.player_score.innerHTML = me.currHand.total().toString();
                els.dealer_score.innerHTML = dealer.currHand.total().toString();
                els.bet.disabled = "disabled";
                els.bet_amount.disabled = "disabled";
                els.player_cont.innerHTML = me.currHand.toString();
                els.dealer_cont.innerHTML = dealer.currHand.toString();

                //check to see if player got blackjack
                var totals = me.currHand.total();
                for(var i in totals) {
                    if(totals[i] == 21) {
                        alert("Blackjack!! You win!");
                        me.wonHand();
                        resetUI();
                        els.starting_amount.value = me.currMoney;
                    }
                }
            }
        }
    };

    /** this is the actions to take on the "hit" button **/
    els.hit.onclick = function() {
        // add a card into player hand
        deck.hit(me.currHand);

        //show current player cards
        var totals = me.currHand.total();
        els.player_cont.innerHTML = me.currHand.toString();
        els.dealer_cont.innerHTML = dealer.currHand.toString();
        els.player_score.innerHTML = totals.toString();

        // calculate if the player has blackjack or bust
        var bustFlag = true;
        for(var i in totals) {
            if(totals[i] < 21)
                bustFlag = false;
            else if(totals[i] == 21) {
                alert("Blackjack!! You win!");
                me.wonHand();
                resetUI();
                bustFlag = false;
            }
        }
        if(bustFlag) {
            alert("You bust! :(");
            resetUI();
        }

        els.starting_amount.value = me.currMoney;
    };

    /** this is the actions to take on the "stay" button **/
    els.stay.onclick = function() {
        //dealer starts their turn
        dealer.play(deck);

        //flip over dealer cards to make them visiable
        dealer.currHand.setAllVisible();
        els.dealer_cont.innerHTML = dealer.currHand.toString();

        //check dealer score vs player score to see who wins
        var dealer_high = dealer.currHand.highestValidScore();
        var player_high = me.currHand.highestValidScore();
        if(dealer_high > 21 || dealer_high == -1) {
            alert("You Win! Dealer busts.");
            me.wonHand();
        } else if(dealer_high == 21) {
            alert("You lose. The dealer got blackjack.");
        } else if (player_high == dealer_high) {
            alert("You win! Dealer's score was " + dealer_high +" and tie goes to the player.");
            me.wonHand();
        } else if (player_high >= dealer_high) {
            alert("You win! Dealer's score was " + dealer_high +".");
            me.wonHand();
        } else if (player_high < dealer_high) {
            alert("You lost. The dealer's hand was larger than yours at "+dealer_high+".");
        }

        resetUI();

        els.starting_amount.value = me.currMoney;
    };
};

//start a new game. we have to wait til onload so the dom is fully initialized before we try to reference things on it
window.onload = function() {
    /**start the game when a new object is initialized**/
    runGame();
}
