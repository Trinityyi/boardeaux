import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainArea from './MainArea';
import Header from './Header';
import CardModalDialog from './CardModalDialog';
import MenuPanel from './MenuPanel';
import { store, persistor } from '../store/reducer';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>
          <Header />
          <MainArea />
          <CardModalDialog />
          <MenuPanel />
        </DndProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
