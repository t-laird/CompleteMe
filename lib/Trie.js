export default class Trie {
  constructor(){
    this.suggestions = [];

  }

  insert (word) {
    this.suggestions.push(word);
  }

  count () {
    return this.suggestions.length;
  }

  suggest (query) {
    return this.suggestions.filter( word => {
      return word.includes(query);
    });
  }
}