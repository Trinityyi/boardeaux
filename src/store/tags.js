import { v4 as uuid } from 'uuid';

export const initialState = {};

export const actionTypes = {
  CREATE_TAG: 'CREATE_TAG',
  IMPORT_TAGS: 'IMPORT_TAGS'

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CREATE_TAG:
    return {
      ...state,
      [action.id]: action.data
    };
  case actionTypes.IMPORT_TAGS:
    return action.data;
  default:
    return state;
  }
};

export const actions = {
  createTag: data => {
    const id = uuid();
    data.id = id;
    return {
      type: actionTypes.CREATE_TAG,
      data,
      id
    };
  },
  importTags: data => {
    return {
      type: actionTypes.IMPORT_TAGS,
      data
    };
  },
};

export default reducer;
