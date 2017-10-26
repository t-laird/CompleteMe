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
    expect(completeMe).to.deep.equal({suggestionObjects: [],suggestions: [],  trie: {letter: '',children: {}, completesWord: false, chosenCount: 0, lastChosen: 0}, wordCount: 0});
  });

  describe('insert', function () {
    it('Count should return 1 after adding 1 item', function () {
      completeMe.insert('pizza');
      expect(completeMe.count()).to.equal(1);
    });
    it('Count should return 2 after adding 2 items', function () {
      completeMe.insert('pizza');
      completeMe.insert('popcorn');
      expect(completeMe.count()).to.equal(2);
    });
    it('Count should return 3 after adding 3 items', function () {
      completeMe.insert('pizza');
      completeMe.insert('apples');
      completeMe.insert('popcorn');
      expect(completeMe.count()).to.equal(3);
    });
    it('Should have a value of true for completes word at the last node of the word pizza', function() {
      completeMe.insert('pizza');
      let aNode = completeMe.trie.children.p.children.i.children.z.children.z.children.a;
            
      expect(aNode.completesWord).to.equal(true);
    });
  })
  
  describe('suggest (before populate)', function () {
    beforeEach( () => {
      completeMe.insert('pizza');
    })
    it('Should be able to offer a suggestion based upon the first several characters', function () {
      expect(completeMe.suggest('piz')).to.deep.equal(['pizza']);
    });
    it('Should be return an empty array when the word does not exist in the trie', function () {
      expect(completeMe.suggest('bad')).to.deep.equal([]);
    });
  });

  describe('populate', function () {
    beforeEach( function () {
      completeMe.populate(dictionary);
    });

    it('Should have 235,886 items after using the populate method', function () {
      expect(completeMe.count()).to.equal(235886);
    });

    it('Should have 26 children in the first node after import', function () {
      expect(Object.keys(completeMe.trie.children).length).to.equal(26);
    });

    it('Should have a value of true for completes word at the last node of the word Apple', function() {
      let eNode = completeMe.trie.children.a.children.p.children.p.children.l.children.e;

      expect(eNode.completesWord).to.equal(true);
    });
    
  });

  describe('suggest (after dictionary import)', function () {
    beforeEach( function () {
      completeMe.populate(dictionary);
    });

    it('Should offer suggestions given a large data set from dictionary import', function () {
      expect(completeMe.suggest('pizz')).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);
    });
  });


  describe('select', function () {
    beforeEach( function () {
      completeMe.populate(dictionary);
    });

    it('Should increment the chosen count of the corresponding node to the last character of a word upon selection', function () {
      let eNode = completeMe.trie.children.a.children.p.children.p.children.l.children.e;

      expect(eNode.chosenCount).to.equal(0);
      completeMe.select('apple');
      expect(eNode.chosenCount).to.equal(1);
    });

    it('Should set the recency of the last selection after being selcted ', function () {
      let eNode = completeMe.trie.children.a.children.p.children.p.children.l.children.e;

      expect(eNode.lastChosen).to.equal(0);
      completeMe.select('apple');
      expect(eNode.lastChosen).to.equal(Date.now());
    });

    it('Should re-set the recency of the last selection after being selected again', function () {
      let eNode = completeMe.trie.children.a.children.p.children.p.children.l.children.e;

      expect(eNode.lastChosen).to.equal(0);
      completeMe.select('apple');
      expect(eNode.lastChosen).to.equal(Date.now());
      completeMe.select('apple');
      expect(eNode.lastChosen).to.equal(Date.now());

    });

    it('Should increase the priority of a suggestion after its being selected', function () {
      completeMe.select('pizzeria');
      completeMe.suggest('pizz');
      expect(completeMe.suggestions).to.deep.equal(['pizzeria','pizza', 'pizzicato', 'pizzle']);
    });

    it('Should increase the priority of two different words when both have been selected', function () {
      completeMe.select('pizzeria');
      completeMe.select('pizzle');
      completeMe.suggest('pizz');
      expect(completeMe.suggestions).to.deep.equal(['pizzeria', 'pizzle', 'pizza', 'pizzicato']);
    });
    it.skip('When several words have been selected the same number of times, suggestions should be ordered by recency', function () {
      completeMe.suggest('pizz');
      expect(completeMe.suggestions).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);
      completeMe.select('pizza');
      completeMe.suggest('pizz');

      expect(completeMe.suggestions).to.deep.equal(['pizzle', 'pizzicato', 'pizzeria', 'pizza']);
    });
  });
});
