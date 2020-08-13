import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import renderDndConnected from '../test_utils/renderDndConnected';
import Card from '../../components/Card';

const noop = () => { };

describe('<Card/>', () => {
  let wrapper, cardWrapper, card;

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

  describe('drag', () => {
    beforeEach(() => {
      cardWrapper = wrapper.querySelector('.card-wrapper');
      card = wrapper.querySelector('.card-wrapper > .card');
    });

    it('initial opacity is 1', () => {
      expect(card.style.opacity).toEqual('1');
    });

    describe('when drag starts', () => {
      beforeEach(() => {
        fireEvent.dragStart(cardWrapper);
      });

      it('opacity is 0', async() => {
        await waitFor(() => expect(card.style.opacity).toEqual('0'));
      });

      describe('when drag end', () => {
        beforeEach(() => {
          fireEvent.dragEnd(cardWrapper);
        });

        it('opacity is 1', async() => {
          await waitFor(() => expect(card.style.opacity).toEqual('1'));
        });
      });
    });
  });
});
