import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useClickOutside from '../hooks/useClickOutside';
import combineClassNames from '@chalarangelo/combine-class-names';

export const TagPropShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string
});

const Popover = ({ children, popoverContent, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickRef = useRef();

  useClickOutside(clickRef, () => {
    if (isOpen) setIsOpen(false);
  }, `#${id} .popover-content-container`);

  return(
    <div
      className="popover-wrapper"
      id={id}
    >
      <div
        className="popover-inner-wrapper"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </div>
      <div
        className={combineClassNames`popover-content-container ${isOpen ? '' : 'hidden'}`}
        ref={clickRef}
      >
        {popoverContent}
      </div>
    </div>
  );
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  popoverContent: PropTypes.node.isRequired
};

export default Popover;
