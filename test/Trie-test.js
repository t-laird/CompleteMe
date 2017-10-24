import Trie from '../lib/Trie.js';
import { expect, assert } from 'chai';
import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');
let completeMe;

describe('CompleteMe', function () {
  beforeEach( () => {
    completeMe = new Trie();
  });
  it('Should be instantiated with the correct default values' , function () {
    expect(completeMe).to.deep.equal({suggestionObjects: [],suggestions: [],  linkedList: {letter: '',children: {}, completesWord: false, chosenCount: 0, lastChosen: 0}, wordCount: 0})
  });

  describe('insert', function () {
    beforeEach( () => {
      completeMe.insert('pizza');
    });
    it('Count should return 1 after adding 1 item', function () {
      expect(completeMe.count()).to.equal(1);
    });
    it('Count should return 2 after adding 2 items', function () {
      completeMe.insert('popcorn');
      expect(completeMe.count()).to.equal(2);
    });
    it('Count should return 3 after adding 3 items', function () {
      completeMe.insert('apples');
      completeMe.insert('popcorn');
      expect(completeMe.count()).to.equal(3);
    });
  })

  describe('suggest', function () {
    beforeEach( () => {
      completeMe.insert('pizza');
    })
    it('Should be able to offer a suggestion based upon the first several characters', function () {
      expect(completeMe.suggest('piz')).to.deep.equal(['pizza']);
    });
    it('Should be return an empty array when the word does not exist in the trie', function () {
      expect(completeMe.suggest('bad')).to.deep.equal([]);
    });
  })

  describe('populate', function () {
    beforeEach( () => {
      completeMe.populate(dictionary);      
    });
    it('Should have 235,886 items after using the populate method', function () {
      expect(completeMe.count()).to.equal(235886);
    });
    it('Should offer suggestions given a large data set from dictionary import', function () {
      expect(completeMe.suggest('pizz')).to.deep.equal(['pizza','pizzeria','pizzicato','pizzle']);
    });
    it('Should increase the priority of a suggestion after its being selected', function () {
      completeMe.select('pizzeria');
      completeMe.select('pizzeria');
      completeMe.suggest('pizz');
      expect(completeMe.suggestions).to.deep.equal(['pizzeria','pizza','pizzicato','pizzle']);
    });
  });
});
