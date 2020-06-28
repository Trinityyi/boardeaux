import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useClickOutside from '../hooks/useClickOutside';
import combineClassNames from '@chalarangelo/combine-class-names';

const AddButton = ({
  id,
  name,
  defaultValue = '',
  onSubmit,
  buttonText,
  wrapperClassName = '',
  buttonClassName = '',
  inputClassName = ''
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    if (isEditable) {
      onSubmit(clickRef.current.querySelector(`#${id}`).value);
      setIsEditable(false);
    }
  });

  return (
    <div className={combineClassNames`add-button-wrapper ${wrapperClassName}`} ref={clickRef}>
      {isEditable ? (
        <input
          className={inputClassName ? inputClassName : null}
          type="text"
          name={name}
          id={id}
          defaultValue={defaultValue}
        />
      ) : (
        <button
          className={combineClassNames`btn btn-add icon icon-plus ${buttonClassName}`}
          onClick={() => setIsEditable(true)}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

AddButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default AddButton;
