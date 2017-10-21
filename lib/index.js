import Trie from './Trie.js';
import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

let autoComplete = new Trie();
let testArray = ['haha','yeah','sweet'];
console.log(autoComplete);

$('.autocomplete').on('keyup', updateSuggestion);

function updateSuggestion () {
  // autoComplete.suggest($('.autocomplete').val());
}

$('.autocomplete').autocomplete({
  source : testArray,
  autoFocus: true,
  delay: 500
});


// $('.autocomplete').autoComplete

module.exports = { Trie };