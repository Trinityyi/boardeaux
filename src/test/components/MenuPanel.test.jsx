import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderConnected from '../test_utils/renderConnected';
import MenuPanel from '../../components/MenuPanel';

describe('<MenuPanel/>', () => {
  let wrapper;

  beforeEach(() => {
    const utils = renderConnected(
      <MenuPanel />,
      {
        initialState: {
          interface: {
            isMainMenuOpen: true
          }
        }
      }
    );
    wrapper = utils.container;
  });

  it('renders an appropriate wrapper', () => {
    expect(wrapper.querySelector('.main-menu-wrapper')).toBeInTheDocument();
  });

  it('renders visible', () => {
    expect(wrapper.querySelector('.main-menu-wrapper.hidden')).not.toBeInTheDocument();
  });

  it('renders an appropriate inner wrapper', () => {
    expect(wrapper.querySelector('.main-menu-panel')).toBeInTheDocument();
  });

  it('renders a close button', () => {
    expect(wrapper.querySelector('.btn-menu-close')).toBeInTheDocument();
  });

  describe('when close button licked', () => {
    beforeEach(() => {
      fireEvent.click(wrapper.querySelector('.btn-menu-close'));
    });

    it('renders hidden', () => {
      expect(wrapper.querySelector('.main-menu-wrapper.hidden')).toBeInTheDocument();
    });
  });
});
