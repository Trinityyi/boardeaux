import { actions as boardActions } from './board';
import { actions as cardsActions } from './cards';
import { actions as columnsActions } from './columns';
import { actions as interfaceActions } from './interface';

export default {
  ...boardActions,
  ...cardsActions,
  ...columnsActions,
  ...interfaceActions
};
