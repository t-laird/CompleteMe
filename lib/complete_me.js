import Trie from "../lib/Trie";
import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n')


export default class CompleteMe extends Trie {
  constructor () {
    super (...arguments);

  }

  populate(source) {
    this.suggestions.push(...source);
  }
}

