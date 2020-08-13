import React from 'react';
import renderDndConnected from '../utils/renderDndConnected';
import Card from '../../components/Card';

const noop = () => { };

describe('<Card/>', () => {
  let wrapper;

  beforeEach(() => {
    const utils = renderDndConnected(
      <Card
        card={{ id: '1', title: 'Card', priority: 2 }}
        columnId={'a'}
        index={0}
        setCardModalId={noop}
        removeCardFromColumn={noop}
        setIsHovered={noop}
        setDraggedCard={noop}
        handleDrop={noop}
      />,
      {});
    wrapper = utils.container;
  });

  it('renders an appropriate element', () => {
    expect(wrapper.querySelector('li')).toBeInTheDocument();
  });
});
