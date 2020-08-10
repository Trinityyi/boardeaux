import React from 'react';
import renderConnected from '../utils/renderConnected';
import CardModalDialog from '../../components/CardModalDialog';

describe('<CardModalDialog/>', () => {
  let wrapper, getByText;

  beforeEach(() => {
    const utils = renderConnected(
      <CardModalDialog />,
      {
        initialState: {
          interface: {
            cardModalId: 'my-card'
          },
          cards: {
            'my-card': {
              id: 'my-card',
              title: 'My card',
              description: 'This is a description'
            }
          }
        }
      }
    );
    wrapper = utils.container;
    getByText = utils.getByText;
  });

  it('renders a modal wrapper', () => {
    expect(wrapper.querySelector('.modal-wrapper')).toBeInTheDocument();
  });

  it('renders with the correct id', () => {
    expect(wrapper.querySelector('#card-modal-my-card')).toBeInTheDocument();
  });

  it('renders the contents of the card', () => {
    expect(getByText('My card')).not.toBe(null);
    expect(getByText('This is a description')).not.toBe(null);
  });
});
