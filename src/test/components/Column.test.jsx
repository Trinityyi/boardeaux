import React from 'react';
import renderDndConnected from '../utils/renderDndConnected';
import Column from '../../components/Column';
import { cards } from '../fixtures/cards';

describe('<Column/>', () => {
  let wrapper, getByText;

  beforeEach(() => {
    const utils = renderDndConnected(
      <Column
        id='1'
        cards={cards}
        title='Cool things'
      />
    );
    wrapper = utils.container;
    getByText = utils.getByText;
  });

  it('renders a column', () => {
    expect(wrapper.querySelector('.column')).toBeInTheDocument();
  });

  it('renders the correct tile', () => {
    expect(wrapper.querySelector('.column-title')).toBeInTheDocument();
    expect(getByText('Cool things')).not.toBe(null);
  });

  it('renders a list of cards', () => {
    expect(wrapper.querySelectorAll('li').length).toBe(cards.length);
  });
});
