import Node from './Node.js';
export default class Trie {
  constructor(){
    this.suggestions = [];
    this.suggestionObjects = [];
    this.linkedList = new Node('',false);
    this.wordCount = 0;
  }

  insert (word) {
    let wordArray = word.split('');
    let nodeTraversal = this.linkedList.children;

    while(wordArray.length > 1) {
      if (nodeTraversal.hasOwnProperty(wordArray[0])){
      } else {
        nodeTraversal[wordArray[0]] = new Node(wordArray[0],false);
      }
      nodeTraversal = nodeTraversal[wordArray[0]]['children'];
      wordArray.shift();
    }

    while (wordArray.length === 1){
      if (nodeTraversal.hasOwnProperty(wordArray[0])){
        nodeTraversal[wordArray[0]].completesWord = true;
        nodeTraversal = nodeTraversal[wordArray[0]];
      } else {
        nodeTraversal[wordArray[0]] = new Node(wordArray[0],true);
      }
      nodeTraversal = nodeTraversal[wordArray[0]]['children'];
      wordArray.shift();
      this.wordCount++;
    }
  }

  count () {
    return this.wordCount;
  }

  suggest (query) {
    this.suggestions = [];
    this.suggestionObjects = [];
    let currentPOS = this.linkedList;
    let queryArray = query.trim().split('');
    queryArray.forEach( letter => {
      currentPOS = currentPOS['children'][letter];
    });
    this.findSuggestion(currentPOS,query);
    this.suggestionObjects.sort( (a,b) => {
      return b.count - a.count;
    });
    Object.keys(this.suggestionObjects).forEach (suggestion =>{
      this.suggestions.push(this.suggestionObjects[suggestion].word);
    });
  }

  findSuggestion (position,query){
    Object.keys(position['children']).forEach( node => {
      if (Object.keys(position['children'][node]['children']).length === 0){
        this.suggestionObjects.push({word: (query + node), count: (position['children'][node]['chosenCount']), recency: (position['children'][node]['lastChosen'])});
      } else {
        return this.findSuggestion.call(this, position['children'][node], (query+node));
      }
    });
  }

  populate(source) {
    source.forEach( word => {
      this.insert(word);
    });
  }

  select(word) {
    let wordArray = word.split('');
    let currentPOS = this.linkedList;
    wordArray.forEach( letter => {
      currentPOS = currentPOS['children'][letter];
    });
    currentPOS.chosenCount++;
    currentPOS.lastChosen = Date.now();
  }
}