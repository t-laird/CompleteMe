import Trie from '../lib/Trie.js';
import { expect, assert } from 'chai';
const text = "/usr/share/dict/words";


describe('Trie', function (){
  let completeMe = new Trie();

  it ('Should have an item after using the insert method', function (){
    completeMe.insert('pizza');
    expect(completeMe.count()).to.equal(1);
  });

  it ('Should have two items after inserting a second item' , function(){
    completeMe.insert('apple');
    expect(completeMe.count()).to.equal(2);
  });
});