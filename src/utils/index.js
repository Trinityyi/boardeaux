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
