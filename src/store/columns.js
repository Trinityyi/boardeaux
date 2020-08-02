import { v4 as uuid } from 'uuid';

export const initialState = {};

export const actionTypes = {
  CREATE_COLUMN: 'CREATE_COLUMN',
  ADD_CARD_TO_COLUMN: 'ADD_CARD_TO_COLUMN'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CREATE_COLUMN:
    return {
      ...state,
      [action.id]: action.data
    };
  case actionTypes.ADD_CARD_TO_COLUMN:
    return {
      ...state,
      [action.columnId]: {
        ...state[action.columnId],
        cardIds: [
          ...state[action.columnId].cardIds,
          action.cardId
        ]
      }
    };
  default:
    return state;
  }
};

export const actions = {
  createColumn: data => {
    const id = uuid();
    data.id = id;
    data.cardIds = [];
    return {
      type: actionTypes.CREATE_COLUMN,
      data,
      id
    };
  },
  addCardToColumn: (cardId, columnId) => {
    return {
      type: actionTypes.ADD_CARD_TO_COLUMN,
      cardId,
      columnId
    };
  }
};

export default reducer;
