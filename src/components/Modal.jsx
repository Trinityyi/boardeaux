import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import combineClassNames from '@chalarangelo/combine-class-names';

const Modal = ({
  children,
  id,
  className = '',
  container
}) => {
  return ReactDOM.createPortal(
    <div className="modal-wrapper">
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
  className: PropTypes.string,
  container: PropTypes.node.isRequired
};

export default Modal;
