const initialState = {
  name: 'Board',
  board: {
    id: 0,
    title: 'Board',
    columnIds: []
  },
  columns: {
  },
  cards: {
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_BOARD_TITLE:
    return {
      ...state,
      board: {
        ...state.board,
        title: action.title
      }
    };

  default:
    return state;
  }
};

export const SET_BOARD_TITLE = 'SET_BOARD_TITLE';
export const setBoardTitle = title => {
  return {
    type: SET_BOARD_TITLE,
    title
  };
};


export default reducer;
