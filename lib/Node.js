export default class Node {
  constructor (letter,completesWord){
    this.letter = letter;
    this.children = {};
    this.completesWord = completesWord;
    this.chosenCount = 0;
    this.lastChosen = 0;
  }
}