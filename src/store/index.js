const initialState = {
  name: 'Board'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_BOARD_NAME:
    return {
      ...state,
      name: action.name
    };

  default:
    return state;
  }
};

export const SET_BOARD_NAME = 'SET_BOARD_NAME';
export const setBoardName = name => {
  return {
    type: SET_BOARD_NAME,
    name
  };
};


export default reducer;
