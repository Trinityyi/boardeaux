import React from 'react';
import PropTypes from 'prop-types';
import combineClassNames from '@chalarangelo/combine-class-names';

const Modal = ({
  children,
  id,
  onClose,
  className = ''
}) => {
  return (
    <div
      className={combineClassNames`modal-wrapper ${className}`}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" id={id}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Modal;
