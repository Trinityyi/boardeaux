import { v4 as uuid } from 'uuid';

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

  case CREATE_CARD:
    return {
      ...state,
      cards: {
        ...state.cards,
        [action.id]: action.data
      }
    };
  case CREATE_COLUMN:
    return {
      ...state,
      columns: {
        ...state.columns,
        [action.id]: action.data
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

export const CREATE_CARD = 'CREATE_CARD';
export const createCard = data => {
  const id = uuid();
  data.id = id;
  return {
    type: CREATE_CARD,
    data,
    id
  };
};

export const CREATE_COLUMN = 'CREATE_COLUMN';
export const createColumn = data => {
  const id = uuid();
  data.id = id;
  data.cardIds = [];
  return {
    type: CREATE_COLUMN,
    data,
    id
  };
};

export default reducer;
