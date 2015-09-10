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
    this.setAllVisible = function() {
        for (var i in hand) {
            hand[i].setVisible();
        }
    }
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

/*

 var c1 = new Card({suit:'spade',value:3})
 var c2 = new Card({suit:'spade',value:1})
 var c3 = new Card({suit:'spade',value:1})
 var h = new Hand(c1);
 h.addCard(c2);
 h.addCard(c3);
 h.total();

 */