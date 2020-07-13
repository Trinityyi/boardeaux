import { v4 as uuid } from 'uuid';

const initialState = {
  name: 'Board',
  board: {
    id: 0,
    title: 'Board',
    columnIds: []
  },
  columns: {},
  cards: {},
  cardModalId: null
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
  case ADD_CARD_TO_COLUMN:
    return {
      ...state,
      columns: {
        ...state.columns,
        [action.columnId]: {
          ...state.columns[action.columnId],
          cardIds: [
            ...state.columns[action.columnId].cardIds,
            action.cardId
          ]
        }
      }
    };
  case SET_CARD_MODAL_ID:
    return {
      ...state,
      cardModalId: action.cardId
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
export const createCard = (data, columnId) => dispatch => {
  const id = uuid();
  data.id = id;
  dispatch({
    type: CREATE_CARD,
    data,
    id
  });
  dispatch(addCardToColumn(id, columnId));
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

export const ADD_CARD_TO_COLUMN = 'ADD_CARD_TO_COLUMN';
export const addCardToColumn = (cardId, columnId) => {
  return {
    type: ADD_CARD_TO_COLUMN,
    cardId,
    columnId
  };
};

export const SET_CARD_MODAL_ID = 'SET_CARD_MODAL_ID';
export const setCardModalId = cardId => {
  return {
    type: SET_CARD_MODAL_ID,
    cardId
  };
};

export default reducer;
