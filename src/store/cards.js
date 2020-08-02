import { v4 as uuid } from 'uuid';
import { actions as columnsActions } from './columns';

const { addCardToColumn } = columnsActions;

export const initialState = {};

export const actionTypes = {
  CREATE_CARD: 'CREATE_CARD',
  SET_CARD_TITLE: 'SET_CARD_TITLE',
  SET_CARD_DESCRIPTION: 'SET_CARD_DESCRIPTION',
  IMPORT_CARDS: 'IMPORT_CARDS'
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
  case actionTypes.IMPORT_CARDS:
    return action.data;
  default:
    return state;
  }
};

export const actions = {
  createCard: (data, columnId) => dispatch => {
    const { title, description } = data;
    const id = uuid();
    dispatch({
      type: actionTypes.CREATE_CARD,
      data: {
        id,
        title,
        description: description ? description : ''
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
  importCards: data => {
    return {
      type: actionTypes.IMPORT_CARDS,
      data
    };
  }
};

export default reducer;
