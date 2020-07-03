import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditableText from '../../components/EditableText';

describe('<EditableText/>', () => {
  let wrapper, getByText;
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    const utils = render(
      <>
        <EditableText
          id="my-text"
          name="my-text"
          value="Hello"
          onChange={onChangeSpy}
        />
        <span id="other" />
      </>
    );
    wrapper = utils.container;
    getByText = utils.getByText;
  });

  it('renders an .editable-text-wrapper', () => {
    expect(wrapper.querySelector('.editable-text-wrapper')).toBeInTheDocument();
  });

  it('renders as non-editable by default', () => {
    expect(wrapper.querySelector('.editable-text-wrapper > input')).not.toBeInTheDocument();
    expect(getByText('Hello')).not.toBe(null);
  });

  describe('when clicked', () => {
    beforeEach(() => {
      fireEvent.click(wrapper.querySelector('.editable-text-wrapper > :first-child'));
    });

    it('renders as editable', () => {
      const inputField = wrapper.querySelector('.editable-text-wrapper > input');
      expect(inputField).toBeInTheDocument();
      expect(inputField.value).toEqual('Hello');
    });

    describe('when value changes', () => {
      beforeEach(() => {
        fireEvent.change(wrapper.querySelector('.editable-text-wrapper > :first-child'), { target: { value: 'Hey' } });
      });

      it('fires onChange with the updated value', () => {
        expect(onChangeSpy.mock.calls.length).toBe(1);
        expect(onChangeSpy.mock.calls[0][0]).toBe('Hey');
      });
    });

    describe('on click outside', () => {
      beforeEach(() => {
        fireEvent.click(wrapper.querySelector('#other'));
      });

      it('renders as non-editable', () => {
        expect(wrapper.querySelector('.editable-text-wrapper > input')).not.toBeInTheDocument();
        expect(getByText('Hello')).not.toBe(null);
      });
    });
  });
});
