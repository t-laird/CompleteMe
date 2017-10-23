import Trie from './Trie.js';
import $ from 'jquery'
global.jQuery = require('jquery');
require('webpack-jquery-ui/autocomplete');

const text = "../dictionary/web2";
let dictionary = [];
let autoComplete = new Trie();

$.get(text, function (data){
  let words = data;
  dictionary = words.toString().trim().split('\n');
  autoComplete.populate(dictionary);
});

let testArray = ['haha','yeah','sweet'];


$('.autocomplete').on('keyup', updateSuggestion);

function updateSuggestion () {
  let inputVal = $('.autocomplete').val();
  console.log(inputVal.length);
  if (inputVal.length > 2){
    autoComplete.suggest(inputVal)
    autoFunc();
  }
}

function autoFunc () {
  $(".autocomplete").autocomplete({
      source: autoComplete.suggestions
  });
}

function selectWord () {
  autoComplete.select($('.autocomplete').val());
  $('.autocomplete').val('').focus();
}

$('.select').on('click', selectWord);



module.exports = { Trie };