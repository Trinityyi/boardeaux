import { insertAt, moveTo } from '../utils';

export const initialState = {
  id: 0,
  title: 'Board',
  columnIds: []
};

export const actionTypes = {
  SET_BOARD_TITLE: 'SET_BOARD_TITLE',
  ADD_COLUMN_TO_BOARD: 'ADD_COLUMN_TO_BOARD',
  MOVE_COLUMN_INSIDE_BOARD: 'MOVE_COLUMN_INSIDE_BOARD'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_BOARD_TITLE:
    return {
      ...state,
      title: action.title
    };
  case actionTypes.ADD_COLUMN_TO_BOARD:
    return {
      ...state,
      columnIds: action.index === -1 ? [
        ...state.columnIds,
        action.columnId
      ] : insertAt(
        action.columnId,
        state.columnIds,
        action.index
      )
    };
  case actionTypes.MOVE_COLUMN_INSIDE_BOARD:
    return {
      ...state,
      columnIds: moveTo(
        action.columnId,
        state.columnIds,
        action.index
      )
    };
  default:
    return state;
  }
};

export const actions = {
  setBoardTitle: title => {
    return {
      type: actionTypes.SET_BOARD_TITLE,
      title
    };
  },
  addColumnToBoard: (columnId, index = -1) => {
    return {
      type: actionTypes.ADD_COLUMN_TO_BOARD,
      columnId,
      index
    };
  },
  moveColumnInsideBoard: (columnId, index) => {
    return {
      type: actionTypes.MOVE_COLUMN_INSIDE_BOARD,
      columnId,
      index
    };
  }
};

export default reducer;
