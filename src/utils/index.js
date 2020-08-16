import Remark from 'remark';
import toHAST from 'mdast-util-to-hast';
import hastToHTML from 'hast-util-to-html';

const remarkConfig = {
  commonmark: true,
  footnotes: true,
  gfm: true,
  pedantic: true
};
const remark = new Remark().data('settings', remarkConfig);

export const parseMarkdown = md => hastToHTML(toHAST(remark.parse(md)));

/**
 * Inserts an element at the specified index in the array.
 * Returns a new array with the result (non-mutating).
 * @param {*} el - The element to be inserted.
 * @param {array} arr - An array of elements.
 * @param {number} i - Insertion index.
 */
export const insertAt = (el, arr, i) => {
  const result = [...arr];
  result.splice(i, 0, el);
  return result;
};

/**
 * Moves and element to the specified index in the array.
 * Returns a new array with the result (non-mutating).
 * @param {*} el - The element to be moved.
 * @param {array} arr - An array of elements.
 * @param {number} i - New index for the element.
 */
export const moveTo = (el, arr, i) => {
  return arr.reduce((acc, v, j) => {
    if(v === el)return acc;
    if(j === i) return [...acc, el, v];
    if(j === arr.length - 1 && i >= j) return [...acc, v, el];
    return [...acc, v];
  }, []);
};

/**
 * Calculate the foreground color depending on the given background color.
 * @param {string} hex - The hex value to use for calculations.
 */
export const determineColor = hex => {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  h = parseInt(h, 16);
  const [red, green, blue] = [
    h >>> 16,
    (h & 0x00ff00) >>> 8,
    (h & 0x0000ff) >>> 0
  ];
  if((red * 0.299 + green * 0.587 + blue * 0.114) > 186) return '#000';
  return '#fff';
};

/**
 * Returns a random hex color code.
 */
export const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
