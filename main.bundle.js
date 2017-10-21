/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Trie = __webpack_require__(1);

	var _Trie2 = _interopRequireDefault(_Trie);

	var _fs = __webpack_require__(3);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var text = "/usr/share/dict/words";
	var dictionary = _fs2.default.readFileSync(text).toString().trim().split('\n');

	var autoComplete = new _Trie2.default();
	var testArray = ['haha', 'yeah', 'sweet'];
	console.log(autoComplete);

	$('.autocomplete').on('keyup', updateSuggestion);

	function updateSuggestion() {
	  // autoComplete.suggest($('.autocomplete').val());
	}

	$('.autocomplete').autocomplete({
	  source: testArray,
	  autoFocus: true,
	  delay: 500
	});

	// $('.autocomplete').autoComplete

	module.exports = { Trie: _Trie2.default };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _Node = __webpack_require__(2);

	var _Node2 = _interopRequireDefault(_Node);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Trie = function () {
	  function Trie() {
	    _classCallCheck(this, Trie);

	    this.suggestions = [];
	    this.linkedList = new _Node2.default('', false);
	    this.wordCount = 0;
	  }

	  _createClass(Trie, [{
	    key: 'insert',
	    value: function insert(word) {
	      var wordArray = word.split('');
	      var nodeTraversal = this.linkedList.children;

	      while (wordArray.length > 1) {
	        if (nodeTraversal.hasOwnProperty(wordArray[0])) {} else {
	          nodeTraversal[wordArray[0]] = new _Node2.default(wordArray[0], false);
	        }
	        nodeTraversal = nodeTraversal[wordArray[0]]['children'];
	        wordArray.shift();
	      }

	      while (wordArray.length === 1) {
	        if (nodeTraversal.hasOwnProperty(wordArray[0])) {
	          nodeTraversal[wordArray[0]].completesWord = true;
	          nodeTraversal = nodeTraversal[wordArray[0]];
	        } else {
	          nodeTraversal[wordArray[0]] = new _Node2.default(wordArray[0], true);
	        }
	        nodeTraversal = nodeTraversal[wordArray[0]]['children'];
	        wordArray.shift();
	        this.wordCount++;
	      }
	    }
	  }, {
	    key: 'count',
	    value: function count() {
	      return this.wordCount;
	    }
	  }, {
	    key: 'suggest',
	    value: function suggest(query) {
	      this.suggestions = [];
	      var currentPOS = this.linkedList;
	      var queryArray = query.split('');
	      queryArray.forEach(function (letter) {
	        currentPOS = currentPOS['children'][letter];
	      });
	      this.findSuggestion(currentPOS, query);
	    }
	  }, {
	    key: 'findSuggestion',
	    value: function findSuggestion(position, query) {
	      var _this = this;

	      Object.keys(position['children']).forEach(function (node) {
	        if (Object.keys(position['children'][node]['children']).length === 0) {
	          _this.suggestions.push(query + node);
	        } else {
	          return _this.findSuggestion.call(_this, position['children'][node], query + node);
	        }
	      });
	    }
	  }, {
	    key: 'populate',
	    value: function populate(source) {
	      var _this2 = this;

	      source.forEach(function (word) {
	        _this2.insert(word);
	      });
	    }
	  }]);

	  return Trie;
	}();

	exports.default = Trie;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Node = function Node(letter, completesWord) {
	  _classCallCheck(this, Node);

	  this.letter = letter;
	  this.children = {};
	  this.completesWord = completesWord;
	  this.chosenCount = 0;
	  this.lastChosen = 0;
	};

	exports.default = Node;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	

/***/ })
/******/ ]);