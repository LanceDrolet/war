const config = require('./config.json')

class card{
    constructor(suit, rank){ 
        //check for invalid suit
        if(!config.suits.includes(suit)){
            throw new Error('invalid suit');
        }
        //check for invalid rank
        if(rank.value > 14 || rank.value < 2)
        {
            throw new Error('invalid rank');
        }
        //assign values
        this.suit = suit;
        this.rank = rank;
    }
}


module.exports = card;