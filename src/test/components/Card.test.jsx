import React from 'react';
import renderConnected from '../utils/renderConnected';
import Card from '../../components/Card';

describe('<Header/>', () => {
  let wrapper;

  beforeEach(() => {
    const utils = renderConnected(
      <Card card={{ id: '1', title: 'Card', priority: 2 }}/>,
      {});
    wrapper = utils.container;
  });

  it('renders an appropriate element', () => {
    expect(wrapper.querySelector('li')).toBeInTheDocument();
  });
});
