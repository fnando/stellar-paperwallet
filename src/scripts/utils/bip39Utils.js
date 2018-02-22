import bip39 from "bip39";
import unorm from "unorm";

const cache = {};

export function normalize(string) {
  return unorm.nfkd(string);
}

export function mnemonicJoiner(language) {
  return language === "japanese" ? "\u3000" : " ";
}

export function mnemonicJoin(language, mnemonic) {
  const joiner = mnemonicJoiner(language);
  return normalize(mnemonic.join(joiner));
}

export function isValidMnemonic(language, mnemonic) {
  const dictionary = bip39.wordlists[language];
  const mnemonicString = normalize(mnemonicJoin(language, mnemonic));

  return bip39.validateMnemonic(mnemonicString, dictionary);
}

export function isValidDictionaryEntry(language, entry) {
  const dictionary = normalizedDictionary(language);
  return dictionary.includes(normalize(entry));
}

export function mnemonicSplit(language, mnemonic) {
  return mnemonic.split(mnemonicJoiner(language));
}

export function normalizedDictionary(language) {
  let dictionary = cache[language];

  if (dictionary) {
    return dictionary;
  }

  dictionary = bip39.wordlists[language].map(word => normalize(word));
  cache[language] = dictionary;

  return dictionary;
}
