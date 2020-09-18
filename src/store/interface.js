export const initialState = {
  cardModalId: null,
  isMainMenuOpen: false,
  hoveredCardId: null,
  hoveredCardState: false,
  draggedCard: null,
  hoveredColumnId: null,
  hoveredColumnState: false,
  draggedColumn: null
};

export const actionTypes = {
  SET_CARD_MODAL_ID: 'SET_CARD_MODAL_ID',
  SET_MAIN_MENU_OPEN: 'SET_MAIN_MENU_OPEN',
  SET_HOVERED_CARD: 'SET_HOVERED_CARD',
  SET_DRAGGED_CARD: 'SET_DRAGGED_CARD',
  SET_HOVERED_COLUMN: 'SET_HOVERED_COLUMN',
  SET_DRAGGED_COLUMN: 'SET_DRAGGED_COLUMN'
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
  case actionTypes.SET_HOVERED_COLUMN:
    return {
      ...state,
      hoveredColumnId: action.hoveredColumnId,
      hoveredColumnState: action.hoveredColumnState
    };
  case actionTypes.SET_DRAGGED_COLUMN:
    return {
      ...state,
      draggedColumn: action.columnData
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
  setHoveredColumn: (id, hoveredState) => {
    if (hoveredState.position) {
      return {
        type: actionTypes.SET_HOVERED_COLUMN,
        hoveredColumnId: id,
        hoveredColumnState: hoveredState
      };
    }
    return {
      type: actionTypes.SET_HOVERED_COLUMN,
      hoveredColumnId: null,
      hoveredColumnState: false
    };
  },
  setDraggedColumn: columnData => {
    return {
      type: actionTypes.SET_DRAGGED_COLUMN,
      columnData
    };
  },
};

export default reducer;
