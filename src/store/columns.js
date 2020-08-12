import { v4 as uuid } from 'uuid';
import { insertAt, moveTo } from '../utils';

export const initialState = {};

export const actionTypes = {
  CREATE_COLUMN: 'CREATE_COLUMN',
  ADD_CARD_TO_COLUMN: 'ADD_CARD_TO_COLUMN',
  IMPORT_COLUMNS: 'IMPORT_COLUMNS',
  REMOVE_CARD_FROM_COLUMN: 'REMOVE_CARD_FROM_COLUMN',
  MOVE_CARD_INSIDE_COLUMN: 'MOVE_CARD_INSIDE_COLUMN'
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
        cardIds: action.index === -1 ? [
          ...state[action.columnId].cardIds,
          action.cardId
        ] : insertAt(
          action.cardId,
          state[action.columnId].cardIds,
          action.index
        )
      }
    };
  case actionTypes.MOVE_CARD_INSIDE_COLUMN:
    return {
      ...state,
      [action.columnId]: {
        ...state[action.columnId],
        cardIds: moveTo(
          action.cardId,
          state[action.columnId].cardIds,
          action.index
        )
      }
    };
  case actionTypes.IMPORT_COLUMNS:
    return action.data;
  case actionTypes.REMOVE_CARD_FROM_COLUMN:
    return {
      ...state,
      [action.columnId]: {
        ...state[action.columnId],
        cardIds:
          state[action.columnId].cardIds.filter(id => id !== action.cardId)
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
  addCardToColumn: (cardId, columnId, index = -1) => {
    return {
      type: actionTypes.ADD_CARD_TO_COLUMN,
      cardId,
      columnId,
      index
    };
  },
  importColumns: data => {
    return {
      type: actionTypes.IMPORT_COLUMNS,
      data
    };
  },
  removeCardFromColumn: (cardId, columnId) => {
    return {
      type: actionTypes.REMOVE_CARD_FROM_COLUMN,
      cardId,
      columnId
    };
  },
  moveCardInsideColumn: (cardId, columnId, index) => {
    return {
      type: actionTypes.MOVE_CARD_INSIDE_COLUMN,
      cardId,
      columnId,
      index
    };
  }
};

export default reducer;
