import persistedReducer, { store, persistor, rootPersistConfig } from '../store/reducer';
import { persistReducer } from 'redux-persist';

export const exportToJSON = () => {
  const { board, cards, columns, tags } = store.getState();
  let a = document.createElement('a');
  const file = new Blob([JSON.stringify({ board, cards, columns, tags })], { type: 'application/json' });
  a.href = URL.createObjectURL(file);
  a.download = 'boardeaux_export.json';
  a.click();
};

export const importFromJSON = fileList => {
  if (!fileList.length || fileList[0].type.indexOf('json') === -1) return;
  const file = fileList[0];
  const reader = new FileReader();
  persistor.pause();
  reader.addEventListener('load', event => {
    const { board, cards, columns, tags } = JSON.parse(event.target.result);
    store.replaceReducer(persistReducer(rootPersistConfig, state => {
      return {
        interface: state.interface,
        board,
        cards,
        columns,
        tags
      };
    }));
    persistor.dispatch({ type: 'IMPORT_FROM_JSON' });
    store.replaceReducer(persistedReducer);
    persistor.persist();
    document.getElementById('main-menu-load-json').value = '';
  }, { once: true });
  reader.readAsText(file);
};
