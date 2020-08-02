import { store } from '../store/reducer';

export const exportToJSON = () => {
  const { board, cards, columns } = store.getState();
  let a = document.createElement('a');
  const file = new Blob([JSON.stringify({ board, cards, columns })], { type: 'application/json' });
  a.href = URL.createObjectURL(file);
  a.download = 'boardeaux_export.json';
  a.click();
};

