var Hand = function (card) {
    var hand = [card];

    //adds a card to our current hand
    this.addCard = function (card) {
        hand.push(card);
    };

    this.split = function () {
        /////// ?
    };

    //function to return current total(s) given the cards in a hand
    this.total = function () {
        // returns total value of cards in an array
        // if an ace is present, will return multiple values in an array
        var total = 0;
        var total2 = 0;
        var numAces = 0;
        var tempFlag = false;
        for (var i in hand) {
            if(hand[i].value == "ace")
                numAces++;
        }
        for (var i in hand) {
            var card = hand[i];
            //higher total if needed
            if (card.value == "ace" && numAces > 0 && !tempFlag) {
                total2 += 11;
                tempFlag = true;
            } else if (numAces > 0) {
                total2 += parseInt(card.pointValue);
            }
            //regular total
            total += parseInt(card.pointValue);
        }
        //ace hands can have 2 potential values, so this returns both options
        if (total2 > 0)
            return [total, total2];
        else
            return [total];
    };

    this.toString = function () {
        var str = "\n";
        for (var i in hand) {
            str += hand[i].toString() + "<br>";
        }
        return str;
    };

    //set all cards in the hand to be visible
    this.setAllVisible = function() {
        for (var i in hand) {
            hand[i].setVisible();
        }
    }

    //returns the highest score (if multiples or not) that is valid for a hand that is still under 22
    //if there is no valid score, returns -1
    this.highestValidScore = function() {
        var totals = this.total();
        var currHigh = -1;
        for(var i in totals) {
            if(totals[i] < 22 && totals[i] > currHigh)
                currHigh = totals[i];
        }
        return currHigh;
    }
};