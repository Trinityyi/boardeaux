import { store } from '../store/reducer';
import actions from '../store/actions';
import { initialState as boardInitialState } from '../store/board';
import { initialState as columnsInitialState } from '../store/columns';
import { initialState as cardsInitialState } from '../store/cards';
import { initialState as tagsInitialState } from '../store/tags';

const { importCards, importColumns, importBoard, importTags } = actions;

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
    store.dispatch(importBoard(boardInitialState));
    store.dispatch(importColumns(columnsInitialState));
    store.dispatch(importCards(cardsInitialState));
    store.dispatch(importTags(tagsInitialState));
    store.dispatch(importTags(tags));
    store.dispatch(importCards(cards));
    store.dispatch(importColumns(columns));
    store.dispatch(importBoard(board));
  });
  reader.readAsText(file);
};
