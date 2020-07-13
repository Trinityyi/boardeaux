import React from 'react';
import renderConnected from '../utils/renderConnected';
import Column from '../../components/Column';
import { cards } from '../fixtures/cards';

describe('<Column/>', () => {
  let wrapper, getByText;

  beforeEach(() => {
    const utils = renderConnected(
      <Column
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
