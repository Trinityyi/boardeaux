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
