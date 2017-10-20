import { expect, assert } from 'chai';
import CompleteMe from '../lib/complete_me.js';
import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n')


describe('CompleteMe', function (){
  let completeMe = new CompleteMe();

  it('Should be able to suggest words based upon a query', function (){
    completeMe.insert('pizza');
    expect(completeMe.count()).to.equal(1);
    expect(completeMe.suggest('bad')).to.deep.equal([]);
    expect(completeMe.suggest('piz')).to.deep.equal(['pizza']);
  });

  it.skip('Should have an item after using the insert method', function (){
    completeMe.suggestions = [];
    completeMe.populate(dictionary);
    expect(completeMe.count()).to.equal(235886);
  });

});