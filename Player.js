var Player = function () {
    this.currHand = null;
    this.currMoney = 1000;
    this.currBet = 0;

    //bet function handles if a bet is valid. If so, it subtracts from player's money
    this.bet = function(amount) {
        if(this.currMoney - amount < 1) {
            alert('You broke with that bet!');
            return false;
        } else {
            this.currMoney -= amount;
            this.currBet = amount;
            return true;
        }
    }

    //won hand means we get our money back plus some
    this.wonHand = function() {
        this.currMoney += this.currBet*2;
        this.currBet = 0;
        this.currHand = null;
    };
};