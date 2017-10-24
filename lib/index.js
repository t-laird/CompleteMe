import Trie from './Trie.js';
import $ from 'jquery'
global.jQuery = require('jquery');
require('webpack-jquery-ui/autocomplete');

const text = "../dictionary/web2";
let autoComplete = new Trie();

$.get(text, function (data) {
  let words = data;
  let dictionary = words.toString().trim().split('\n');

  autoComplete.populate(dictionary);
});

$('.autocomplete').on('keyup', updateSuggestion);

function updateSuggestion () {
  let inputVal = $('.autocomplete').val();

  if (inputVal.length > 2) {
    autoComplete.suggest(inputVal)
    autoCompleteFunc();
  }
}

function autoCompleteFunc () {
  $(".autocomplete").autocomplete({
    source: autoComplete.suggestions
  });
}

function selectWord () {
  if (!autoComplete.select($('.autocomplete').val())) {
    $('body').prepend('<h1>i am a very bad boy</h1>');
  }
  $('.autocomplete').val('').focus();
}

$('.select').on('click', selectWord);



module.exports = { Trie };