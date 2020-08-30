import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tag from '../../components/Tag';

describe('<Tag/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <Tag
        tag={{
          id: '1',
          name: 'Cool things',
          color: 'blue',
          backgroundColor: 'red'
        }}
      />
    ).container;
  });

  it('renders a tag', () => {
    expect(wrapper.querySelector('.tag')).toBeInTheDocument();
  });

  it('use tag color', () => {
    expect(wrapper.querySelector('.tag').style.color).toBe('blue');
    expect(wrapper.querySelector('.tag').style.backgroundColor).toBe('red');
  });

  describe('when pass onDelete', () => {
    let onDeleteSpy = jest.fn();

    beforeEach(() => {
      wrapper = render(
        <Tag
          tag={{
            id: '1',
            name: 'Cool things',
            color: 'blue',
            backgroundColor: 'red'
          }}
          onDelete={onDeleteSpy}
        />
      ).container;
    });

    it('renders a closable tag', () => {
      expect(wrapper.querySelector('.tag.closable')).toBeInTheDocument();
    });

    it('runs onDelete when clicked', () => {
      fireEvent.click(wrapper.querySelector('.tag.closable'));
      expect(onDeleteSpy.mock.calls.length).toBe(1);
    });
  });

});
