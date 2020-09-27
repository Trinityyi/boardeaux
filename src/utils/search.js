const stopWords = [
  'a',
  'about',
  'above',
  'after',
  'again',
  'against',
  'all',
  'am',
  'an',
  'and',
  'any',
  'are',
  "aren't",
  'as',
  'at',
  'be',
  'because',
  'been',
  'before',
  'being',
  'below',
  'between',
  'both',
  'but',
  'by',
  "can't",
  'cannot',
  'check',
  'checks',
  'could',
  "couldn't",
  'did',
  "didn't",
  'do',
  'does',
  "doesn't",
  'doing',
  "don't",
  'down',
  'during',
  'each',
  'few',
  'for',
  'from',
  'further',
  'had',
  "hadn't",
  'has',
  "hasn't",
  'have',
  "haven't",
  'having',
  'he',
  "he'd",
  "he'll",
  "he's",
  'her',
  'here',
  "here's",
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'how',
  "how's",
  'i',
  "i'd",
  "i'll",
  "i'm",
  "i've",
  'if',
  'in',
  'into',
  'is',
  "isn't",
  'it',
  "it's",
  'its',
  'itself',
  "let's",
  'me',
  'more',
  'most',
  "mustn't",
  'my',
  'myself',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'on',
  'once',
  'only',
  'or',
  'other',
  'ought',
  'our',
  'ours',
  'ourselves',
  'out',
  'over',
  'own',
  'return',
  'returns',
  'same',
  "shan't",
  'she',
  "she'd",
  "she'll",
  "she's",
  'should',
  "shouldn't",
  'so',
  'some',
  'such',
  'than',
  'that',
  "that's",
  'the',
  'their',
  'theirs',
  'them',
  'themselves',
  'then',
  'there',
  "there's",
  'these',
  'they',
  "they'd",
  "they'll",
  "they're",
  "they've",
  'this',
  'those',
  'through',
  'to',
  'too',
  'under',
  'until',
  'up',
  'very',
  'was',
  "wasn't",
  'we',
  "we'd",
  "we'll",
  "we're",
  "we've",
  'were',
  "weren't",
  'what',
  "what's",
  'when',
  "when's",
  'where',
  "where's",
  'which',
  'while',
  'who',
  "who's",
  'whom',
  'why',
  "why's",
  'with',
  "won't",
  'would',
  "wouldn't",
  'you',
  "you'd",
  "you'll",
  "you're",
  "you've",
  'your',
  'yours',
  'yourself',
  'yourselves'
];

// Standard suffix manipulations.
const step2list = {
  ational: 'ate',
  tional: 'tion',
  enci: 'ence',
  anci: 'ance',
  izer: 'ize',
  bli: 'ble',
  alli: 'al',
  entli: 'ent',
  eli: 'e',
  ousli: 'ous',
  ization: 'ize',
  ation: 'ate',
  ator: 'ate',
  alism: 'al',
  iveness: 'ive',
  fulness: 'ful',
  ousness: 'ous',
  aliti: 'al',
  iviti: 'ive',
  biliti: 'ble',
  logi: 'log',
};

const step3list = {
  icate: 'ic',
  ative: '',
  alize: 'al',
  iciti: 'ic',
  ical: 'ic',
  ful: '',
  ness: '',
};

// Consonant-vowel sequences.
const consonant = '[^aeiou]';
const vowel = '[aeiouy]';
const consonants = '(' + consonant + '[^aeiouy]*)';
const vowels = '(' + vowel + '[aeiou]*)';

const gt0 = new RegExp('^' + consonants + '?' + vowels + consonants);
const eq1 = new RegExp(
  '^' + consonants + '?' + vowels + consonants + vowels + '?$'
);
const gt1 = new RegExp('^' + consonants + '?(' + vowels + consonants + '){2,}');
const vowelInStem = new RegExp('^' + consonants + '?' + vowel);
const consonantLike = new RegExp('^' + consonants + vowel + '[^aeiouwxy]$');

// Exception expressions.
const sfxLl = /ll$/;
const sfxE = /^(.+?)e$/;
const sfxY = /^(.+?)y$/;
const sfxIon = /^(.+?(s|t))(ion)$/;
const sfxEdOrIng = /^(.+?)(ed|ing)$/;
const sfxAtOrBlOrIz = /(at|bl|iz)$/;
const sfxEED = /^(.+?)eed$/;
const sfxS = /^.+?[^s]s$/;
const sfxSsesOrIes = /^.+?(ss|i)es$/;
const sfxMultiConsonantLike = /([^aeiouylsz])\1$/;
const step2 = new RegExp(
  '^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$'
);
const step3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
const step4 = new RegExp(
  '^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$'
);

/**
 * Tokenizes a string:
 * - Split into words using a regular expression.
 * - Filter words that are under 2 characters long
 */
const tokenize = str =>
  str
    .split(/[^a-z0-9\-']+/i)
    .filter(tkn => !tkn.length < 2)
    .map(tkn => tkn.toLowerCase());

/**
 * Stems a string:
 * - Return as-is if under 3 characters long
 * - Use porter stemmer otherwise
 */
const stem = str => {
  // Exit early
  if(str.length < 3) return str;

  let firstCharacterWasLowerCaseY;
  let match;

  // Detect initial `y`, make sure it never matches.
  if (str.startsWith('y')) {
    firstCharacterWasLowerCaseY = true;
    str = 'Y' + str.slice(1);
  }

  // Step 1a.
  if (sfxSsesOrIes.test(str)) {
    // Remove last two characters.
    str = str.slice(0, -2);
  } else if (sfxS.test(str)) {
    // Remove last character.
    str = str.slice(0, -1);
  }

  // Step 1b.
  if ((match = sfxEED.exec(str))) {
    if (gt0.test(match[1])) {
      // Remove last character.
      str = str.slice(0, -1);
    }
  } else if ((match = sfxEdOrIng.exec(str)) && vowelInStem.test(match[1])) {
    str = match[1];

    if (sfxAtOrBlOrIz.test(str)) {
      // Append `e`.
      str += 'e';
    } else if (sfxMultiConsonantLike.test(str)) {
      // Remove last character.
      str = str.slice(0, -1);
    } else if (consonantLike.test(str)) {
      // Append `e`.
      str += 'e';
    }
  }

  // Step 1c.
  if ((match = sfxY.exec(str)) && vowelInStem.test(match[1])) {
    // Remove suffixing `y` and append `i`.
    str = match[1] + 'i';
  }

  // Step 2.
  if ((match = step2.exec(str)) && gt0.test(match[1]))
    str = match[1] + step2list[match[2]];

  // Step 3.
  if ((match = step3.exec(str)) && gt0.test(match[1]))
    str = match[1] + step3list[match[2]];

  // Step 4.
  if ((match = step4.exec(str))) {
    if (gt1.test(match[1]))
      str = match[1];

  } else if ((match = sfxIon.exec(str)) && gt1.test(match[1]))
    str = match[1];

  // Step 5.
  if (
    (match = sfxE.exec(str)) &&
    (gt1.test(match[1]) ||
      (eq1.test(match[1]) && !consonantLike.test(match[1])))
  )
    str = match[1];

  if (sfxLl.test(str) && gt1.test(str))
    str = str.slice(0, -1);

  // Turn initial `Y` back to `y`.
  if (firstCharacterWasLowerCaseY)
    str = 'y' + str.slice(1);

  return str;
};

/**
 * Removes stop words from an array of words:
 * - Use the list of stop words to remove stop words from the given array
 */
const cleanStopWords = words =>
  words
    .filter(tkn => !stopWords.includes(tkn));

/**
 * Deduplicates a list of tokens.
 */
const deduplicateTokens = tokens => [...new Set(tokens)];

/**
 * Given a string, produce a list of tokens.
 */
const parseTokens = str =>
  deduplicateTokens(
    cleanStopWords(tokenize(str)).map(tkn => stem(tkn))
  ).filter(tkn =>
    !!tkn && tkn.length > 1 && !/^-?\d+$/i.test(tkn) && !/^[()[\]$^.;:|\\/%&*#@!%,"'~`\-+=]+$/i.test(tkn)
  );

export default parseTokens;
