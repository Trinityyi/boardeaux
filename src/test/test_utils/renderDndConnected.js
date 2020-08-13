import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer, { initialState as reducerInitialState } from '../../store/reducer';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const renderDndConnected = (
  ui, {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderDndConnected;
