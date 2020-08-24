import rootReducer, { store } from '../store/reducer';

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
  reader.addEventListener('load', event => {
    const { board, cards, columns, tags } = JSON.parse(event.target.result);
    store.replaceReducer(state => {
      return {
        interface: state.interface,
        board,
        cards,
        columns,
        tags
      };
    });
    store.dispatch({ type: 'IMPORT_FROM_JSON' });
    store.replaceReducer(rootReducer);
    document.getElementById('main-menu-load-json').value = '';
  }, { once: true });
  reader.readAsText(file);
};
