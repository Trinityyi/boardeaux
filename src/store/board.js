export const initialState = {
  id: 0,
  title: 'Board',
  columnIds: []
};

export const actionTypes = {
  SET_BOARD_TITLE: 'SET_BOARD_TITLE'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_BOARD_TITLE:
    return {
      ...state,
      title: action.title
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
  }
};

export default reducer;
