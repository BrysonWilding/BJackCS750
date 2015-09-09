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
        bet: document.getElementById('bet')
    };
    

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

//start a new game
window.onload = function() {
    /**start the game when a new object is initialized**/
    runGame();
}
