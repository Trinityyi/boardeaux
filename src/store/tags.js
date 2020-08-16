import { v4 as uuid } from 'uuid';
import { randomHexColorCode, determineColor } from '../utils';

export const initialState = {};

export const actionTypes = {
  CREATE_TAG: 'CREATE_TAG',
  SET_TAG_COLORS: 'SET_TAG_COLORS',
  SET_TAG_NAME: 'SET_TAG_NAME',
  IMPORT_TAGS: 'IMPORT_TAGS'

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CREATE_TAG:
    return {
      ...state,
      [action.id]: action.data
    };
  case actionTypes.SET_TAG_COLORS:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        color: action.color,
        backgroundColor: action.backgroundColor
      }
    };
  case actionTypes.SET_TAG_NAME:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        name: action.name
      }
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
    data.backgroundColor = randomHexColorCode();
    data.color = determineColor(data.backgroundColor);
    return {
      type: actionTypes.CREATE_TAG,
      data,
      id
    };
  },
  setTagColors: (id, backgroundColor) => {
    return {
      type: actionTypes.SET_TAG_COLORS,
      backgroundColor,
      color: determineColor(backgroundColor),
      id
    };
  },
  setTagName: (id, name) => {
    return {
      type: actionTypes.SET_TAG_NAME,
      name,
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
