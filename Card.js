var Card = function (obj) {
    //a card can be initialized with an object containing "suit" and "value" as a number 1-13
    if (!obj) {
        var obj = {};
    }
    var value = obj.value || "",
        pointValue = 0,
        suit = obj.suit || "",
        visible = false;

    var publicVar = this;

    //setup special card names and values
    switch (value) {
        case 1:
            value = "A";
            pointValue = 1;
            break;
        case 11:
            value = "J";
            pointValue = 10;
            break;
        case 12:
            value = "Q";
            pointValue = 10;
            break;
        case 13:
            value = "K";
            pointValue = 10;
            break;
        default:
            pointValue = value;
            value = value + "";
    }

    publicVar.suit = suit;
    publicVar.value = value;
    publicVar.visible = visible || false;
    publicVar.pointValue = pointValue;

    publicVar.toString = function () {
        if (publicVar.visible)
            return publicVar.value + " of " + publicVar.suit + "s";
        return "unknown";
    };

    //This is ugly, but is the best hack without having to change a bunch of stuff
    publicVar.createCardElement = function(){
        var card = document.createElement('div');
        var front = document.createElement('div');
        var face = document.createElement('div');
        var topleft = document.createElement('div');
        var bottomright = document.createElement('div');
        card.classList.add('card');
        card.style.position = 'relative';
        front.classList.add('front', this.suit.toString() + 's' + this.pointValue.toString());
        face.classList.add('face');
        topleft.classList.add('topleft');
        bottomright.classList.add('bottomright');

        topleft.textContent = this.value;
        bottomright.textContent = this.value;

        front.appendChild(face);
        front.appendChild(topleft);
        front.appendChild(bottomright);
        card.appendChild(front);

        return card;
    };

    //this will set a card that is face down to face up
    publicVar.setVisible = function (value) {
        if (typeof value == "undefined") value = true;
        publicVar.visible = value;
    };
};