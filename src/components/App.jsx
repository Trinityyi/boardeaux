import React from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainArea from './MainArea';
import Header from './Header';
import CardModalDialog from './CardModalDialog';
import MenuPanel from './MenuPanel';
import { store } from '../store/reducer';

const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <MainArea />
        <CardModalDialog />
        <MenuPanel />
      </DndProvider>
    </Provider>
  );
};

export default App;
