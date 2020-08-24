import { v4 as uuid } from 'uuid';
import { actions as columnsActions } from './columns';

const { addCardToColumn } = columnsActions;

export const initialState = {};

export const actionTypes = {
  CREATE_CARD: 'CREATE_CARD',
  SET_CARD_TITLE: 'SET_CARD_TITLE',
  SET_CARD_DESCRIPTION: 'SET_CARD_DESCRIPTION',
  SET_PRIORITY: 'SET_PRIORITY',
  ADD_TAG: 'ADD_TAG',
  REMOVE_TAG: 'REMOVE_TAG'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CREATE_CARD:
    return {
      ...state,
      [action.id]: action.data
    };
  case actionTypes.SET_CARD_TITLE:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        title: action.title
      }
    };
  case actionTypes.SET_CARD_DESCRIPTION:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        description: action.description
      }
    };
  case actionTypes.SET_PRIORITY:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        priority: action.priority
      }
    };
  case actionTypes.ADD_TAG:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        tags: [
          ...state[action.id].tags,
          action.tag
        ]
      }
    };
  case actionTypes.REMOVE_TAG:
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        tags: state[action.id].tags
          .filter(x => x !== action.tag)
      }
    };
  default:
    return state;
  }
};

export const actions = {
  createCard: (data, columnId) => dispatch => {
    const { title, description, tags } = data;
    const id = uuid();
    dispatch({
      type: actionTypes.CREATE_CARD,
      data: {
        id,
        title,
        description: description ? description : '',
        priority: 2,
        tags: tags ? tags : []
      },
      id
    });
    dispatch(addCardToColumn(id, columnId));
  },
  setCardTitle: (id, title) => {
    return {
      type: actionTypes.SET_CARD_TITLE,
      title,
      id
    };
  },
  setCardDescription: (id, description) => {
    return {
      type: actionTypes.SET_CARD_DESCRIPTION,
      description,
      id
    };
  },
  setCardPriority: (id, priority) => {
    return {
      type: actionTypes.SET_PRIORITY,
      priority,
      id
    };
  },
  addTag: (id, tag) => {
    return {
      type: actionTypes.ADD_TAG,
      tag,
      id
    };
  },
  removeTag: (id, tag) => {
    return {
      type: actionTypes.REMOVE_TAG,
      tag,
      id
    };
  }
};

export default reducer;
