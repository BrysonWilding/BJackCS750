var Card = function (obj) {
    //a card can be initialized with an object containing "suit" and "value" as a number 1-13
    if (!obj) {
        var obj = {};
    }
    var value = obj.value || "",
        pointValue = 0,
        suit = obj.suit || "",
        visible = false;

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

    this.suit = suit;
    this.value = value;
    this.visible = visible || false;
    this.pointValue = pointValue;

    this.toString = function () {
        if (this.visible)
            return this.value + " of " + this.suit + "s";
        return "unknown";
    };

    //this will set a card that is face down to face up
    this.setVisible = function (value) {
        if (typeof value == "undefined") value = true;
        this.visible = value;
    };
};