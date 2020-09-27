import { actionTypes as boardActionTypes } from './board';
import { actionTypes as cardsActionTypes } from './cards';
import { actionTypes as columnsActionTypes } from './columns';
import { actionTypes as tagsActionTypes } from './tags';
import { actionTypes as interfaceActionTypes } from './interface';
import { actionTypes as usersActionTypes } from './users';

export default {
  ...boardActionTypes,
  ...cardsActionTypes,
  ...columnsActionTypes,
  ...tagsActionTypes,
  ...interfaceActionTypes,
  ...usersActionTypes
};
