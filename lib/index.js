import Trie from './Trie.js';
import $ from 'jquery'
global.jQuery = require('jquery');
// var jQuery = require("jquery")
// var $ = require("jquery");

// import fs from 'fs';
// const text = "/usr/share/dict/words";
// const dictionary = fs.readFileSync(text).toString().trim().split('\n');

// let autoComplete = new Trie();
let testArray = ['haha','yeah','sweet'];
// console.log(autoComplete);

// $('.autocomplete').on('keyup', updateSuggestion);

function updateSuggestion () {
  // autoComplete.suggest($('.autocomplete').val());
}

// $(document).ready(autoFunc);


// function autoFunc () {
//   var availableTags = [
//     "ActionScript",
//     "AppleScript",
//     "Asp",
//     "BASIC",
//     "C",
//     "C++",
//     "Clojure",
//     "COBOL",
//     "ColdFusion",
//     "Erlang",
//     "Fortran",
//     "Groovy",
//     "Haskell",
//     "Java",
//     "JavaScript",
//     "Lisp",
//     "Perl",
//     "PHP",
//     "Python",
//     "Ruby",
//     "Scala",
//     "Scheme"
//   ];
//   $(".autocomplete").autocomplete({
//       source: completeMe.suggestions
//   });
// }


// $('.autocomplete').autoComplete

module.exports = { Trie };