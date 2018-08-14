assert = require('assert');
card = require('../card');
chai = require('chai');
const expect = chai.expect;

describe('Card', function() {
    it('constructor: happy path', function() {
      const result = new card("hearts", {name: "jack", value: 11});
      expect(result).to.deep.equal({suit: "hearts", rank: {"name": "jack", "value": 11}});
    });

    it('constructor: invalid suit', function() {
      expect(() => new card("toast", {name: "jack", value: 11})).to.throw('invalid suit');
    });

    it('constructor: invalid rank', function() {
      expect(() => new card("hearts", {name: "jack", value: 15})).to.throw('invalid rank');
    });
});