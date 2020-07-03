import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddButton from '../../components/AddButton';

describe('<AddButton/>', () => {
  let wrapper, getByText;
  let onSubmitSpy = jest.fn();

  beforeEach(() => {
    const utils = render(
      <>
        <AddButton
          id="my-text"
          name="my-text"
          defaultValue="Hello"
          onSubmit={onSubmitSpy}
          buttonText="Submit"
          wrapperClassName="my-wrapper"
          buttonClassName="my-button"
          inputClassName="my-input"
        />
        <span id="other" />
      </>
    );
    wrapper = utils.container;
    getByText = utils.getByText;
  });

  it('renders an .add-button-wrapper', () => {
    expect(wrapper.querySelector('.add-button-wrapper')).toBeInTheDocument();
  });

  it('renders as a button by default', () => {
    expect(wrapper.querySelector('.add-button-wrapper > input')).not.toBeInTheDocument();
    expect(wrapper.querySelector('.add-button-wrapper > .btn-add')).toBeInTheDocument();
    expect(getByText('Submit')).not.toBe(null);
  });

  it('passes the given buttonClassName to the button', () => {
    expect(wrapper.querySelector('.btn-add.my-button')).toBeInTheDocument();
  });

  describe('when clicked', () => {
    beforeEach(() => {
      fireEvent.click(wrapper.querySelector('.add-button-wrapper > :first-child'));
    });

    it('renders the input field and controls', () => {
      const inputField = wrapper.querySelector('.add-button-wrapper > input');
      expect(inputField).toBeInTheDocument();
      expect(inputField.value).toEqual('Hello');
      expect(wrapper.querySelector('.add-button-wrapper > .btn-add-submit')).toBeInTheDocument();
      expect(wrapper.querySelector('.add-button-wrapper > .btn-add-cancel')).toBeInTheDocument();
    });

    describe('on submit clicked', () => {
      beforeEach(() => {
        fireEvent.change(wrapper.querySelector('.add-button-wrapper > input'), { target: { value: 'Hey' } });
        fireEvent.click(wrapper.querySelector('.add-button-wrapper > .btn-add-submit'));
      });

      it('fires onChange with the updated value', () => {
        expect(onSubmitSpy.mock.calls.length).toBe(1);
        expect(onSubmitSpy.mock.calls[0][0]).toBe('Hey');
      });
    });

    describe('on click outside', () => {
      beforeEach(() => {
        fireEvent.change(wrapper.querySelector('.add-button-wrapper > input'), { target: { value: 'Hey' } });
        fireEvent.click(wrapper.querySelector('#other'));
      });

      it('fires onChange with the updated value', () => {
        expect(onSubmitSpy.mock.calls.length).toBe(2);
        expect(onSubmitSpy.mock.calls[0][0]).toBe('Hey');
      });
    });

    describe('on cancel clicked', () => {
      beforeEach(() => {
        fireEvent.change(wrapper.querySelector('.add-button-wrapper > input'), { target: { value: 'Hey' } });
        fireEvent.click(wrapper.querySelector('.add-button-wrapper > .btn-add-cancel'));
      });

      it('fires onChange with the updated value', () => {
        expect(onSubmitSpy.mock.calls.length).toBe(2);
      });
    });
  });
});
