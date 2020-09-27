import { v4 as uuid } from 'uuid';
import { insertAt, moveTo } from '../utils';
import { actions as activityLogActions } from './activityLog';
import { actions as boardActions } from './board';

const { logCardActivity } = activityLogActions;
const { addColumnToBoard } = boardActions;

export const initialState = {};

export const actionTypes = {
  CREATE_COLUMN: 'CREATE_COLUMN',
  ADD_CARD_TO_COLUMN: 'ADD_CARD_TO_COLUMN',
  REMOVE_CARD_FROM_COLUMN: 'REMOVE_CARD_FROM_COLUMN',
  MOVE_CARD_INSIDE_COLUMN: 'MOVE_CARD_INSIDE_COLUMN',
  SET_COLUMN_TITLE: 'SET_COLUMN_NAME'
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
  case actionTypes.REMOVE_CARD_FROM_COLUMN:
    return {
      ...state,
      [action.columnId]: {
        ...state[action.columnId],
        cardIds:
          state[action.columnId].cardIds.filter(id => id !== action.cardId)
      }
    };
  case actionTypes.SET_COLUMN_TITLE:
    return {
      ...state,
      [action.columnId]: {
        ...state[action.columnId],
        title: action.title
      }
    };
  default:
    return state;
  }
};

export const actions = {
  createColumn: data => dispatch => {
    const id = uuid();
    data.id = id;
    data.cardIds = [];
    dispatch({
      type: actionTypes.CREATE_COLUMN,
      data,
      id
    });
    dispatch(addColumnToBoard(id));
    return { id }; // Leave as-is for demo init, change later
  },
  addCardToColumn: (cardId, columnId, index = -1) => (dispatch, getState) => {
    const { title: cardTitle } = getState().cards[cardId];
    const { title: columnTitle } = getState().columns[columnId];
    const actionVerb = index === -1 ? 'added' : 'moved';
    const user = getState().users['user'];
    dispatch({
      type: actionTypes.ADD_CARD_TO_COLUMN,
      cardId,
      columnId,
      index
    });
    dispatch(
      logCardActivity(cardId, `${user.name} ${actionVerb} card ${cardTitle} to column ${columnTitle}.`)
    );
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
  },
  setColumnTitle: (columnId, title) => {
    return {
      type: actionTypes.SET_COLUMN_TITLE,
      columnId,
      title
    };
  }
};

export default reducer;
