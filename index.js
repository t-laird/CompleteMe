const Trie = require('./lib/Trie.js');
// import $ from 'jquery';
// global.jQuery = require('jquery');
// require('webpack-jquery-ui/autocomplete');
// require('webpack-jquery-ui');

// const text = "../dictionary/web2";
// let autoComplete = new Trie();

// $.get(text, function (data) {
//   let words = data;
//   let dictionary = words.toString().trim().split('\n');
  
//   autoComplete.populate(dictionary);
//   generateRandomWord(dictionary);
// });

// // $('.autocomplete').on('keyup', updateSuggestion);

// // function updateSuggestion () {
// //   let inputVal = $('.autocomplete').val();

// //   autoComplete.suggest(inputVal);
// //   autoCompleteFunc();
// // }

// function autoCompleteFunc () {
//   $(".autocomplete").autocomplete({
//     source: autoComplete.suggestions.slice(0, 50),
//     minLength: 3,
//     open() {
//       var acData = $(this).data('ui-autocomplete');

//       acData
//         .menu
//         .element
//         .find('li')
//         .each(function () {
//           var me = $(this);
//           var keywords = acData.term.split(' ').join('|');

//           me.html(
//             me.text()
//               .replace(new RegExp("(" + keywords + ")", "gi"), '<b>$1</b>')
//           );
//         });
//     },
//     focus( event, ui ) {
//       event.preventDefault();
//       $( ".autocomplete" ).val( ui.item.value );
//       return false;
//     }
//   });
// }

// function selectWord () {
//   guessRandomWord($('.autocomplete').val());
//   setTimeout(function() {
//     $('.autocomplete').val('').focus();
//   }, 80);
// }

// $('.select').on('click', selectWord);

// let randWord;

// function generateRandomWord (dict) {
//   let randWordNum = Math.floor(Math.random() * 235886);

//   randWord = dict[randWordNum];
//   wordReveal();
// }

// let charsRevealed = 3;

// function wordReveal () {
//   $('.wordHolder').html('');
//   randWord.split('').forEach( (letter, index) => {
//     if (index < charsRevealed) {
//       $('.wordHolder').append(`<span>${letter}</span>`);
//     } else {
//       $('.wordHolder').append(`<span>_</span>`);
//     }
//   });
//   if (charsRevealed < randWord.split('').length) {
//     charsRevealed++;
//   } else if (charsRevealed === randWord.split('').length) {
//     clearTimeout(delayReveal);
//     $('.endgame-message').css('color', 'red').text('YOU LOSE').show();
//     $('.select').attr('disabled', true);
//   }
// }

// let delayReveal = setInterval(wordReveal, 5000);

// function guessRandomWord (word) {
//   let userGuess = word.toLowerCase();

//   if (userGuess === randWord.toLowerCase()) {
//     let points = (randWord.length - charsRevealed + 1) * 100;

//     clearTimeout(delayReveal);
//     charsRevealed = randWord.length;
//     wordReveal();
//     $('.endgame-message')
//       .css('color', 'green')
//       .text(`YOU WON AND EARNED ${points} POINTS`)
//       .show();
//     $('.total-points').text(parseInt($('.total-points').text()) + points);
//     setTimeout(function () {
//       $('.reset').focus();
//     }, 100);
//   }

//   if (parseInt($('.total-points').text()) >= 2500) {
//     $('.beatScore')
//       .html(
//         '<h1>CONGRATULATIONS - <a href="https://www.linkedin.com/in/thomasrlaird/" target="_blank">CLICK HERE TO VIEW MY LINKEDIN PROFILE</a></h1>'
//       )
//       .show();
//   }
// }

// $('.reset').on('click', resetGame);
// function resetGame (e) {
//   clearTimeout(delayReveal);
//   e.preventDefault();
//   $('.endgame-message').hide();
//   $('.autocomplete').focus();
//   $('.beatScore').hide();
//   charsRevealed = 2;
//   wordReveal();
//   $('.select').removeAttr('disabled');
//   delayReveal = setInterval(wordReveal, 5000);
//   $.get(text, function (data) {
//     let words = data;
//     let dictionary = words.toString().trim().split('\n');
    
//     generateRandomWord(dictionary);
//   });
// }



module.exports = { Trie };