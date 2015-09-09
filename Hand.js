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
    this.setAllVisible = function() {
        for(var i in hand) {
            hand[i].setVisible();
        }
    }
};