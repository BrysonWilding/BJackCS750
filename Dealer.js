var Dealer = function () {
    var publicVar = this;
    publicVar.currHand = null;

    //function to let the dealer play - totals and win/lose logic determined elsewhere
    publicVar.play = function (deck) {
        var total = this.currHand.highestValidScore();
        while (total > -1 && total < 17) {
            deck.hit(this.currHand);
            total = this.currHand.highestValidScore();
        }
    };
};