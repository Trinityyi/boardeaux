export const initialState = {
  cardModalId: null,
  isMainMenuOpen: false,
  hoveredCardId: null,
  hoveredCardState: false,
  draggedCard: null,
  indexedDbEnabled: false,
  db: null
};

export const actionTypes = {
  SET_CARD_MODAL_ID: 'SET_CARD_MODAL_ID',
  SET_MAIN_MENU_OPEN: 'SET_MAIN_MENU_OPEN',
  SET_HOVERED_CARD: 'SET_HOVERED_CARD',
  SET_DRAGGED_CARD: 'SET_DRAGGED_CARD',
  SET_INDEXED_DB_ENABLED: 'SET_INDEXED_DB_ENABLED'
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
      draggedCard: action.cardData
    };
  case actionTypes.SET_INDEXED_DB_ENABLED:
    return {
      ...state,
      indexedDbEnabled: action.indexedDbEnabled,
      db: action.db || null
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
  setDraggedCard: cardData => {
    return {
      type: actionTypes.SET_DRAGGED_CARD,
      cardData
    };
  },
  setIndexedDbEnabled: (indexedDbEnabled, db) => {
    return {
      type: actionTypes.SET_INDEXED_DB_ENABLED,
      indexedDbEnabled,
      db
    };
  }
};

export default reducer;
