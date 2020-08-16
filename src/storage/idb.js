import * as idb from 'idb';

export const connectIdb = setIndexedDbEnabled => {
  const indexedDbEnabled = 'indexedDB' in window;
  if (!indexedDbEnabled) return;

  idb.openDB('boardeaux-db', 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains('tags'))
        db.createObjectStore('tags', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('cards'))
        db.createObjectStore('cards', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('columns'))
        db.createObjectStore('columns', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('boards'))
        db.createObjectStore('boards', { keyPath: 'id' });
    }
  }).then(db => setIndexedDbEnabled(indexedDbEnabled, db));
  ;
};

export const createObject = (db, store, object) => {
  const tx = db.transaction(store, 'readwrite');
  const st = tx.objectStore(store);
  st.add(object);
  return tx.complete;
};

export const readObject = (db, store, primaryKey) => {
  const tx = db.transaction(store, 'readonly');
  const st = tx.objectStore(store);
  return st.get(primaryKey);
};

export const updateObject = (db, store, object) => {
  const tx = db.transaction(store, 'readwrite');
  const st = tx.objectStore(store);
  st.put(object);
  return tx.complete;
};

export const deleteObkect = (db, store, primaryKey) => {
  const tx = db.transaction(store, 'readwrite');
  const st = tx.objectStore(store);
  st.delete(primaryKey);
  return tx.complete;
};

export const readObjectStore = (db, store) => {
  const tx = db.transaction(store, 'readonly');
  const st = tx.objectStore(store);
  return st.getAll();
};
