import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MainArea from './MainArea';
import Header from './Header';
import store from '../store';

const App = () => {
  return (
    <Provider store={createStore(store)}>
      <Header />
      <MainArea />
    </Provider>
  );
};

export default App;
