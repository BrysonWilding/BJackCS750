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