export const initialState = {
  cardModalId: null
};

export const actionTypes = {
  SET_CARD_MODAL_ID: 'SET_CARD_MODAL_ID'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_CARD_MODAL_ID:
    return {
      ...state,
      cardModalId: action.cardId
    };
  default:
    return state;
  }
};

export const actions = {
  setCardModalId: cardId => {
    return {
      type: actionTypes.SET_CARD_MODAL_ID,
      cardId
    };
  }
};

export default reducer;
