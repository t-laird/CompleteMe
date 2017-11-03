const Node = require('./Node');

class Trie {
  constructor() {
    this.suggestions = [];
    this.suggestionObjects = [];
    this.trie = new Node('', false);
    this.wordCount = 0;
  }

  insert (word) {
    let wordArray = word.toLowerCase().split('');
    let nodeTraversal = this.trie.children;

    while (wordArray.length) {
      if (!nodeTraversal.hasOwnProperty(wordArray[0])) {
        nodeTraversal[wordArray[0]] = new Node(wordArray[0], false);
      }
      if (wordArray.length === 1) {
        nodeTraversal[wordArray[0]].completesWord = true;
      }
      nodeTraversal = nodeTraversal[wordArray[0]].children;
      wordArray.shift();
    }
    this.wordCount++;    
  }

  count () {
    return this.wordCount;
  }

  navigateToNode(query) {
    let position = this.trie;
    let queryArray = query.toLowerCase().split('');

    queryArray.forEach( letter => {
      if (position === null) {
        return;
      } else if (position.children[letter] === undefined) {
        position = null;
        return;
      } else {
        position = position.children[letter];
      }
    });
    return position;
  }

  suggest (query) {
    this.resetSuggestions();
    let currentPOS = this.navigateToNode(query);

    if (currentPOS === null) {
      return [];
    }
    this.findSuggestion(currentPOS, query); 
    this.sortSuggestions(this.suggestionObjects);
    this.formatSuggestions();


    return this.suggestions;
  }

  findSuggestion (position, query) { 
    Object.keys(position.children).forEach( letter => { 
      let currentNode = position.children[letter];

      if (currentNode.completesWord) {
        this.createSuggestion(query, letter, currentNode);
        return this.findSuggestion(currentNode, query + letter); 
      } else { 
        return this.findSuggestion(currentNode, query + letter);
      }
    });
  }

  createSuggestion(query, letter, currentNode) {
    this.suggestionObjects.push(
      {
        word: (query + letter), 
        count: (currentNode.chosenCount), 
        recency: (currentNode.lastChosen)
      }
    );
    return;
  }

  resetSuggestions() {
    this.suggestions = [];
    this.suggestionObjects = [];
  }

  populate(source) {
    source.forEach( word => {
      this.insert(word);
    });
  }

  sortSuggestions(sortObj) {
    sortObj.sort( (a, b) => {
      return b.count - a.count;
    });

    sortObj.sort( (a, b) => {
      return b.recency - a.recency;
    });

    Object.keys(sortObj).forEach (suggestion =>{
      this.suggestions.push(sortObj[suggestion].word);
    });
  }

  formatSuggestions() {
    this.suggestions = this.suggestions.map( city => {
      let cityStateArr = city.split(', ');
      let cityArr = cityStateArr[0].split(' ');
      let newCityArr = cityArr.map( word => {
        let wordArr = word.split('');
        wordArr[0] = wordArr[0].toUpperCase();
        return wordArr.join('');
      });
      let stateArr = cityStateArr[1];
      stateArr = stateArr.toUpperCase();
      let result = newCityArr.join(' ') + ', ' + stateArr;
      return result;
    });
  }

  select(word) {
    let wordArray = word.trim().split('');
    let currentPOS = this.trie;
    let wordExists = true;

    wordArray.forEach( letter => {
      if (currentPOS.children[letter] !== undefined) {
        currentPOS = currentPOS.children[letter];
      } else {
        wordExists = false;
        return;
      }
    });
    currentPOS.chosenCount++;
    currentPOS.lastChosen = Date.now();
    return wordExists;
  }
}

module.exports = Trie;