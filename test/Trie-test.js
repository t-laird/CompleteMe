import Trie from '../lib/Trie.js';
import { expect, assert } from 'chai';
import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('CompleteMe', function (){
  let completeMe = new Trie();

  it('Should be able to suggest words based upon a query', function (){
    completeMe.insert('pizza');
    // console.log(Object.entries(completeMe.linkedList['children']['p']['children']['i']['children']['z']['children']['z']['children']['a']));
    expect(completeMe.count()).to.equal(1);
    // expect(completeMe.suggest('bad')).to.deep.equal([]);
    // expect(completeMe.suggest('piz')).to.deep.equal(['pizza']);
  });

  it('Should have 235,886 items after using the populate method', function (){
    completeMe = new Trie();
    completeMe.populate(dictionary);
    expect(completeMe.count()).to.equal(235886);
    // console.log(Object.entries(completeMe.linkedList['children']['c']['children']['h']['children']['i']['children']['l']['children']['d']['children']['w']['children']['a']['children']['r']));
  });

  it('Should offer suggestions based upon the first several characters entered', function () {
    completeMe.suggest('pizz');
    expect(completeMe.suggestions).to.deep.equal(['pizza','pizzeria','pizzicato','pizzle']);
  });
  
  it('Should increase the priority of a suggestion after its being selected', function () {
    completeMe.select('pizzeria');
    completeMe.select('pizzeria');
    completeMe.suggest('pizz');
    expect(completeMe.suggestions).to.deep.equal(['pizzeria','pizza','pizzicato','pizzle']);

  });
});
