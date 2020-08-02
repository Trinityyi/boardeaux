export const initialState = {
  cardModalId: null,
  isMainMenuOpen: false
};

export const actionTypes = {
  SET_CARD_MODAL_ID: 'SET_CARD_MODAL_ID',
  SET_MAIN_MENU_OPEN: 'SET_MAIN_MENU_OPEN'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_CARD_MODAL_ID:
    return {
      ...state,
      cardModalId: action.cardId
    };
  case actionTypes.SET_MAIN_MENU_OPEN:
    return {
      ...state,
      isMainMenuOpen: action.isOpen
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
  },
  setMainMenuOpen: isOpen => {
    return {
      type: actionTypes.SET_MAIN_MENU_OPEN,
      isOpen
    };
  }
};

export default reducer;
