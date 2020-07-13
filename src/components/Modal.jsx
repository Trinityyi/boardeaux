import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import combineClassNames from '@chalarangelo/combine-class-names';
import useClickOutside from '../hooks/useClickOutside';

const Modal = ({
  children,
  id,
  onClose,
  className = '',
  container
}) => {
  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    onClose();
  });

  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div
        className={combineClassNames`modal-content ${className}`}
        id={id}
        ref={clickRef}
      >
        {children}
      </div>
    </div>,
    container
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  container: PropTypes.node.isRequired
};

export default Modal;
