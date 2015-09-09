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