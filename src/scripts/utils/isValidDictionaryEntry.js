import bip39 from "bip39";

const dictionary = bip39.wordlists.english;

export default function isValidDictionaryEntry(entry) {
  return dictionary.includes(entry);
}
