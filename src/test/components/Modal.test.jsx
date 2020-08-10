import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '../../components/Modal';

describe('<Modal/>', () => {
  let wrapper;
  const onCloseSpy = jest.fn();

  beforeEach(() => {
    const utils = render(
      <Modal
        id="my-modal"
        onClose={onCloseSpy}
        className="my-special-modal"
        container="my-container"
      >
        <span id="kid" />
      </Modal>
    );
    wrapper = utils.container;
  });

  it('renders a modal wrapper', () => {
    expect(wrapper.querySelector('.modal-wrapper')).toBeInTheDocument();
  });

  it('renders the passed children', () => {
    expect(wrapper.querySelector('span#kid')).toBeInTheDocument();
  });

  it('renders wrapper with the appropriate classes', () => {
    expect(wrapper.querySelector('.modal-wrapper.my-special-modal')).toBeInTheDocument();
  });

  it('renders the inner wrappre', () => {
    expect(wrapper.querySelector('.modal-wrapper .modal-content')).toBeInTheDocument();
  });

  describe('on wrapper click', () => {
    beforeEach(() => {
      fireEvent.click(wrapper.querySelector('.modal-wrapper'));
    });

    it('calls onClose', () => {
      expect(onCloseSpy.mock.calls.length).toBe(1);
    });
  });
});
