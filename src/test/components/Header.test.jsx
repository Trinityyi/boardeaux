import React from 'react';
import renderConnected from '../utils/renderConnected';
import Header from '../../components/Header';

describe('<Header/>', () => {
  let wrapper;
  const initialState = {
    board: {
      title: 'Unicorns'
    }
  };

  beforeEach(() => {
    const utils = renderConnected(<Header />, { initialState });
    wrapper = utils.container;
  });

  it('renders a header', () => {
    expect(wrapper.querySelector('header')).toBeInTheDocument();
  });

  it('renders a logo', () => {
    expect(wrapper.querySelector('img.logo')).toBeInTheDocument();
  });

  it('renders the board title', () => {
    expect(wrapper.querySelector('.board-name').textContent).toBe('Unicorns');
  });

  it('renders a search input', () => {
    expect(wrapper.querySelector('input[type="search"]')).toBeInTheDocument();
  });

  it('renders a menu button', () => {
    expect(wrapper.querySelector('.btn.btn-menu')).toBeInTheDocument();
  });
});
