import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from '@piotr-cz/redux-persist-idb-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import boardReducer, { initialState as boardInitialState } from './board';
import cardsReducer, { initialState as cardsInitialState } from './cards';
import columnsReducer, { initialState as columnsInitialState } from './columns';
import tagsReducer, { initialState as tagsInitialState } from './tags';
import interfaceReducer, { initialState as interfaceInitialState } from './interface';

export const idbStore = createIdbStorage({ name: 'boardeaux-store', storeName: 'boardeaux' });

const rootReducer = combineReducers({
  board: boardReducer,
  cards: cardsReducer,
  columns: columnsReducer,
  interface: interfaceReducer,
  tags: tagsReducer
});

export const rootPersistConfig = {
  key: 'boardeaux',
  storage: idbStore,
  stateReconciler: autoMergeLevel2,
  whitelist: ['board', 'cards', 'columns', 'tags']
};

export const initialState = {
  board: boardInitialState,
  cards: cardsInitialState,
  columns: columnsInitialState,
  interface: interfaceInitialState,
  tags: tagsInitialState
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

