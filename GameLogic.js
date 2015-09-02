var Game = function(startMoney) {
    /** default variables **/
        if(typeof startMoney == "undefined")
            startMoney = 1000;

    /** private object declarations **/
        var Deck = function() {
            var privateVar = "";

            var publicObj = {
                shuffle: function() {}
            };

            //shuffle new instance of deck
            publicObj.shuffle();

            return publicObj;
        };

        var Hands = function() {
            var privateVar = "";

            var publicObj = {};

            return publicObj;
        };

        var Dealer = function() {
            var privateVar = "";

            var publicObj = {};

            return publicObj;
        };
        var Player = function() {
            var privateVar = "";

            var publicObj = {};

            return publicObj;
        };
        var Card = function() {
            var privateVar = "";

            var publicObj = {};

            return publicObj;
        };
    /** end object declarations **/

    /** defined same start routine **/
        function runGame() {

        };

    /** public object returned to the page for new Game Object **/
        var publicObj = {

        };

    /**start the game when a new object is initialized**/
        runGame();
        return publicObj;
};

//start a new game
var game = new Game();