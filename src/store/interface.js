export const initialState = {
  cardModalId: null,
  isMainMenuOpen: false,
  hoveredCardId: null,
  hoveredCardState: false,
  draggedCard: null
};

export const actionTypes = {
  SET_CARD_MODAL_ID: 'SET_CARD_MODAL_ID',
  SET_MAIN_MENU_OPEN: 'SET_MAIN_MENU_OPEN',
  SET_HOVERED_CARD: 'SET_HOVERED_CARD',
  SET_DRAGGED_CARD: 'SET_DRAGGED_CARD'
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
  case actionTypes.SET_HOVERED_CARD:
    return {
      ...state,
      hoveredCardId: action.hoveredCardId,
      hoveredCardState: action.hoveredCardState
    };
  case actionTypes.SET_DRAGGED_CARD:
    return {
      ...state,
      draggedCard: action.cardId
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
  },
  setHoveredCard: (id, hoveredState) => {
    if (hoveredState.position) {
      return {
        type: actionTypes.SET_HOVERED_CARD,
        hoveredCardId: id,
        hoveredCardState: hoveredState
      };
    }
    return {
      type: actionTypes.SET_HOVERED_CARD,
      hoveredCardId: null,
      hoveredCardState: false
    };
  },
  setDraggedCard: cardId => {
    return {
      type: actionTypes.SET_DRAGGED_CARD,
      cardId
    };
  },
};

export default reducer;
