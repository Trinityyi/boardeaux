import { combineReducers } from 'redux';
import boardReducer, { initialState as boardInitialState } from './board';
import cardsReducer, { initialState as cardsInitialState } from './cards';
import columnsReducer, { initialState as columnsInitialState } from './columns';
import interfaceReducer, { initialState as interfaceInitialState } from './interface';

const rootReducer = combineReducers({
  board: boardReducer,
  cards: cardsReducer,
  columns: columnsReducer,
  interface: interfaceReducer
});

export const initialState = {
  board: boardInitialState,
  cards: cardsInitialState,
  columns: columnsInitialState,
  interface: interfaceInitialState
};

export default rootReducer;
