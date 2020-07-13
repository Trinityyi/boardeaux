import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import combineClassNames from '@chalarangelo/combine-class-names';

const Modal = ({
  children,
  id,
  onClose,
  className = '',
  container
}) => {

  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={e => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div
        className={combineClassNames`modal-content ${className}`}
        id={id}
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
  container: PropTypes.instanceOf(Element).isRequired
};

export default Modal;
