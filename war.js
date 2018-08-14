const deck = require('./deck.js');
const player = require('./player.js');
const readline = require('readline');


class War{
    constructor(){
        this.players = [];
    }
    play(numberOfSuits, numberOfRanks, numberOfPlayers ){
        this.numberOfSuits = numberOfSuits;
        this.numberOfPlayers = numberOfPlayers;
        this.numberOfRanks = numberOfRanks;
        this.userInput(this);

    }

    userInput(obj){
        let rl = readline.createInterface(process.stdin, process.stdout);
        rl.setPrompt('What do you want to do? (d)Deal, (n)New Game, (q)Quit ');
        rl.prompt();
        rl.on('line', function(line) {
            switch(line){
                        case 'd':
                            obj.turn(obj);
                            break;
                        case 'n':
                            console.log("New Game!");
                            obj.setup (obj);
                            obj.turn (obj);
                            break;
                        case 'q':
                            rl.close();
                            return;
                        default:
                            break;
                    } 
            rl.prompt();
        }).on('close',function(){
            return;
        });
    }

    setup(obj){
        obj.players.length = 0;
        for(let p = 0; p < obj.numberOfPlayers; p++){
            let t_player = new player("Player " + (p + 1));
            t_player.deck = new deck();
            t_player.deck.create(obj.numberOfSuits, obj.numberOfRanks);
            t_player.deck.shuffle();
            obj.players.push(t_player);
        }
    }

    turn(obj){
        if(this.players < 2){
            console.log("You must first start a new game (n)!");
            return;
        }
        let pile = [];
        let winner = obj.battle(obj.players, pile);
        console.log(winner.name + " wins the round.");
        if(this.players.length === 1){
            console.log(winner.name + " WINS THE GAME!");
            return;
        }
        this.players.forEach(p => {
            console.log(p.name + " has " + p.deck.cards.length + " cards.");
        });
    }

    battle(players, pile){
        let topPlayers = [], topCard = 0, winner = {name: "Player 8"};
        //Establish the top card
        for(let p = 0; p < players.length; p++){
            let player = players[p];
            if(player.deck.cards.length > 0){
                player.draw(player);
                if(player.drawCard.rank.value > topCard){
                    topCard = player.drawCard.rank.value;
                }
            } else {
                //remove players with no remaining cards
                const index = this.players.indexOf(player);
                this.players.splice(index, 1);
                console.log(player.name + " is out!");
                console.log(this.players.length + " players left.");
                if(players.length == 1){
                    winner = players[0];
                    return winner;
                }
                break;
            }
            //report player's card
            console.log(player.name + " Draws a " + player.drawCard.rank.name + " of " + player.drawCard.suit);
        }
        //find player(s) holding top card
        for(let p = 0; p < players.length; p++){
            let player = players[p];
            if(player.drawCard.rank.value == topCard){
                topPlayers.push(player);
            }
            pile.push(player.drawCard);
        }
        // if more than one player has the top card
        if(topPlayers.length > 1){
            console.log(topPlayers.length + " players are tied for top card. It's a Battle!");
            winner = this.battle(topPlayers, []);
        } else {
            winner = topPlayers[0];
        }
        // add the pile to the remaining player's deck
        pile.forEach(card => {
            winner.deck.add(card);
        });

        return winner;
    }
}

module.exports = War;