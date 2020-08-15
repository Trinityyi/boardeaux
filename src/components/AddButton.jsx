import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useClickOutside from '../hooks/useClickOutside';
import combineClassNames from '@chalarangelo/combine-class-names';

/**
 * Renders a stateful component that toggles between an uncontrolled input field
 * with controls and button on click. Clicking the submit button or clicking
 * outside the field runs the passed onSubmit handler.
 */
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

  const handleInputSubmit = (doReset = true) => {
    const inputElement = clickRef.current.querySelector(`#${id}`);
    const inputValue = inputElement.value.trim();

    if (inputValue.length) onSubmit(inputValue);

    if (doReset) setIsEditable(false);
    else if (!inputValue.length) inputElement.select();
    else {
      inputElement.value = '';
      inputElement.focus();
    }
  };

  useClickOutside(clickRef, () => {
    if (isEditable) handleInputSubmit();
  }, '[class*="btn-add"]');

  return (
    <div className={combineClassNames`add-button-wrapper ${wrapperClassName}`} ref={clickRef}>
      {isEditable ? (
        <>
          <input
            className={inputClassName ? inputClassName : null}
            type="text"
            name={name}
            id={id}
            defaultValue={defaultValue}
            autoFocus
            placeholder="Add a card"
            onKeyPress={e => {
              if (e.charCode === 13) handleInputSubmit(false);
            }}
          />
          <button
            className="btn btn-confirm btn-add-submit"
            onClick={() => handleInputSubmit(false)}
          >
            Add Card
          </button>
          <button
            className="btn btn-add-cancel icon icon-x"
            onClick={() => setIsEditable(false)}
          />
        </>
      ) : ( // sad face, so sad!
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
