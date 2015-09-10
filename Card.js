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
            value = "ace";
            pointValue = 1;
            break;
        case 11:
            value = "jack";
            pointValue = 10;
            break;
        case 12:
            value = "queen";
            pointValue = 10;
            break;
        case 13:
            value = "king";
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

    //this will set a card that is face down to face up
    publicVar.setVisible = function (value) {
        if (typeof value == "undefined") value = true;
        publicVar.visible = value;
    };
};