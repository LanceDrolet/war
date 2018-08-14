const Card = require('./card.js');
const deck = require('./deck.js');

class Player{
    constructor(name){
        this.deck = new deck();
        this.name = name;
    }


    draw(){
        this.drawCard = this.deck.deal();
    }
}

module.exports = Player;