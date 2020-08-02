import React from 'react';
import { Provider } from 'react-redux';
import MainArea from './MainArea';
import Header from './Header';
import CardModalDialog from './CardModalDialog';
import MenuModalDialog from './MenuModalDialog';
import { store } from '../store/reducer';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <MainArea />
      <CardModalDialog />
      <MenuModalDialog />
    </Provider>
  );
};

export default App;
