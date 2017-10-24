import Node from './Node';
export default class Trie {
  constructor() {
    this.suggestions = [];
    this.suggestionObjects = [];
    this.linkedList = new Node('',false);
    this.wordCount = 0;
  }

  insert (word) {
    let wordArray = word.split('');
    let nodeTraversal = this.linkedList.children;

    while (wordArray.length) {
      if (!nodeTraversal.hasOwnProperty(wordArray[0])) {
        nodeTraversal[wordArray[0]] = new Node(wordArray[0],false);
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

  suggest (query) {
    this.suggestions = [];
    this.suggestionObjects = [];
    let shouldCancel = false;
    let queryArray = query.trim().split('');
    let currentPOS = this.linkedList;

    queryArray.forEach( letter => {
      if (currentPOS.children[letter] === undefined) {
        return shouldCancel = true;
      }
      currentPOS = currentPOS.children[letter];
    });
    if (shouldCancel === true) {
      return [];
    }
    this.findSuggestion(currentPOS,query);
    this.suggestionObjects.sort( (a,b) => {
      return b.count - a.count;
    });
    Object.keys(this.suggestionObjects).forEach (suggestion =>{
      this.suggestions.push(this.suggestionObjects[suggestion].word);
    });
    return this.suggestions;
  }

  findSuggestion (position,query) { 
    Object.keys(position.children).forEach( node => { 
      let currentNode = position.children[node];

      if (Object.keys(currentNode.children).length === 0) { 
        this.suggestionObjects.push(
          {
            word: (query + node), 
            count: (currentNode.chosenCount), 
            recency: (currentNode.lastChosen)
          });
      } else if (currentNode.completesWord) {
        this.suggestionObjects.push(
          {
            word: (query + node), 
            count: (currentNode.chosenCount), 
            recency: (currentNode.lastChosen)
          }); 
        return this.findSuggestion.call(this, currentNode, query + node); 
      } else { 
        return this.findSuggestion.call(this, currentNode, query + node);
      }
    });
  }

  populate(source) {
    source.forEach( word => {
      this.insert(word);
    });
  }

  select(word) {
    let wordArray = word.trim().split('');
    let currentPOS = this.linkedList;
    let wordExists = true;

    wordArray.forEach( letter => {
      if (currentPOS.children[letter] !== undefined) {
        currentPOS = currentPOS.children[letter];
      } else {
        return wordExists = false;
      }
    });
    currentPOS.chosenCount++;
    currentPOS.lastChosen = Date.now();
    return wordExists;
  }
}