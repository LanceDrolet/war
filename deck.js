const config = require('./config.json');
const card = require('./card');

class deck{

    //create a custom sized deck;
    create(numberOfSuits, numberOfRanks){
        //handle boundry errors
        if(numberOfSuits > 4 || numberOfSuits < 0){
            throw new Error('Invalid number of suits!')
        }
        if(numberOfRanks > 13 || numberOfRanks < 0){
            throw new Error('Invalid number of ranks!')
        }
        //array to hold the cards
        this.cards = [];
        //this produces an empty deck to be filled later
        if(numberOfRanks == 0 || numberOfSuits == 0){ //this produces an empty deck
            return this;
        }//produces the desired deck of cards
        for(let s = 0; s < numberOfSuits; s++){
            for(let r = 0; r < numberOfRanks;  r++){
                this.cards.push(new card(config.suits[s], config.ranks[r]));
            }
        }
        return this;
    }

    //shuffle the deck
    shuffle (){
        //using Fisher-Yates shuffle algorythm 
        let i = 0, j = 0, temp = null, cards = this.cards;
        for (i = cards.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
        }
    }  

    //deal a card
    deal(){
        if(!this.isEmpty()){
            return this.cards.pop();
        } else {
            throw new Error('deck is empty!');
        }
    }

    //adds a card to the bottom of the deck
    add(card){
        this.cards.unshift(card);
    }

    //check for an empty deck
    isEmpty(){
        return this.cards.length == 0;
    }
    
}

module.exports = deck;