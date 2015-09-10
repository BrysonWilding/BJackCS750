var Player = function () {
    var publicVar = this;

    publicVar.currHand = null;
    publicVar.currMoney = 1000;
    publicVar.currBet = 0;

    //bet function handles if a bet is valid. If so, it subtracts from player's money
    publicVar.bet = function(amount) {
        if(publicVar.currMoney - amount < 0) {
            alert('You broke with that bet!');
            return false;
        } else {
            publicVar.currMoney -= amount;
            publicVar.currBet = amount;
            return true;
        }
    }

    //won hand means we get our money back plus some
    publicVar.wonHand = function() {
        publicVar.currMoney += publicVar.currBet*2;
        publicVar.currBet = 0;
        publicVar.currHand = null;
    };
};