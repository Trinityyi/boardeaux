import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useClickOutside from '../hooks/useClickOutside';

const EditableText = ({
  id,
  name,
  value,
  onChange
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    if (isEditable) setIsEditable(false);
  });

  return (
    <div className="editable-text-wrapper" ref={clickRef}>
      {
        isEditable ? (
          <input
            type="text"
            name={name}
            id={id}
            onChange={e => onChange(e.target.value)}
            value={value}
          />
        ) : (
          <span onClick={() => setIsEditable(true)}>{value}</span>
        )
      }
    </div>
  );

};

EditableText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EditableText;
