chai = require('chai');
deck = require('../deck.js');
Card = require('./card.js');
const expect = chai.expect;

describe('deck', function() {
    it('constructor: happy path', function() {
      const result = new deck();
    });

    it('create deck: happy path', function() {
      const result = new deck();
      result.create(4, 13);
      expect(result.cards.length).to.equal(52);
    });

    it('create deck: invalid suits', function() {
      const result = new deck();
      expect(() => result.create(5, 13)).to.throw('Invalid number of suits!');
    });

    it('create deck: invalid ranks', function() {
      const result = new deck();
      expect(() => result.create(4, 14)).to.throw('Invalid number of ranks!');
    });

    it('create deck: empty deck', function() {
      const result = new deck();
      expect(result.create(0,0)).to.deep.equal({cards: []});
    });

    it('shuffle: compare to static deck', function() {
      const shuffledeck = new deck();
      const staticdeck = new deck();
      staticdeck.create(4, 13);
      shuffledeck.create(4, 13);
      shuffledeck.shuffle();
      expect(staticdeck).to.not.deep.equal(shuffledeck);
    });

    it('shuffle: compare two shuffled decks', function() {
      const shuffledeck1 = new deck();
      const shuffledeck2 = new deck();
      shuffledeck1.create(4, 13);
      shuffledeck2.create(4, 13);
      shuffledeck1.shuffle();
      shuffledeck2.shuffle();
      expect(shuffledeck1).to.not.deep.equal(shuffledeck2);
    });
    
      it('deal: one card from the top', function() {
      const result = new deck();
      result.create(4, 13);
      let drawCard = result.deal();
      expect(drawCard.rank.value).to.equal(14);
      expect(drawCard.suit).to.equal('spades');
    });

      it('deal: expect an error', function() {
      const result = new deck();
      result.create();
      expect(() => result.deal()).to.throw('deck is empty!');
    });

      it('add: add card to deck', function() {
      const result = new deck();
      result.create();
      result.add(new card('hearts', {name: '4', value: 4}));
      expect(result.cards.length).to.equal(1);
    });
});