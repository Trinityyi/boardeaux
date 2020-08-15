import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import boardReducer, { initialState as boardInitialState } from './board';
import cardsReducer, { initialState as cardsInitialState } from './cards';
import columnsReducer, { initialState as columnsInitialState } from './columns';
import tagsReducer, { initialState as tagsInitialState } from './tags';
import interfaceReducer, { initialState as interfaceInitialState } from './interface';

const rootReducer = combineReducers({
  board: boardReducer,
  cards: cardsReducer,
  columns: columnsReducer,
  interface: interfaceReducer,
  tags: tagsReducer
});

export const initialState = {
  board: boardInitialState,
  cards: cardsInitialState,
  columns: columnsInitialState,
  interface: interfaceInitialState,
  tags: tagsInitialState
};

export default rootReducer;

export const store = createStore(rootReducer, applyMiddleware(thunk));
