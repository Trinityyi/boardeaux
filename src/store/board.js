export const initialState = {
  id: 0,
  title: 'Board',
  columnIds: []
};

export const actionTypes = {
  SET_BOARD_TITLE: 'SET_BOARD_TITLE',
  IMPORT_BOARD: 'IMPORT_BOARD'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_BOARD_TITLE:
    return {
      ...state,
      title: action.title
    };
  case actionTypes.IMPORT_BOARD:
    return action.data;
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
  importBoard: data => {
    return {
      type: actionTypes.IMPORT_BOARD,
      data
    };
  }
};

export default reducer;
