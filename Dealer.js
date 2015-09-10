var Dealer = function () {
    this.currHand = null;

    /*var cardNumber = 0;
    var nextCard = cardArray.pop();
    var endHand = false;
    dealerTotal = Dealer.firstCard.pointValue + Dealer.secondCard.pointValue;


    this.currHand = null;
    */
    this.play = function (deck) {
        var total = this.currHand.highestValidScore();
        while (total > -1 && total < 17) {
            deck.hit(this.currHand);
            total = this.currHand.highestValidScore();
        }
    };
};