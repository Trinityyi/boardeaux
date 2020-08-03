import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useClickOutside from '../hooks/useClickOutside';
import { parseMarkdown } from '../utils';

/**
 * Renders a stateful component that toggles between editable and view-only on
 * click. Editing the value runs the passed onChange handler and should update
 * the input field's value (controlled input), otherwise it will not work
 * correctly.
 */
const EditableText = ({
  id,
  name,
  value,
  onChange,
  isDefaultEditable = false,
  isMultiline = false,
  isMarkdown = false
}) => {
  const [isEditable, setIsEditable] = useState(isDefaultEditable);
  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    if (isEditable) setIsEditable(false);
  });

  const EditableField = isMultiline ? 'textarea' : 'input';
  return (
    <div className="editable-text-wrapper" ref={clickRef}>
      {
        isEditable ? (
          <EditableField
            type="text"
            name={name}
            id={id}
            onChange={e => onChange(e.target.value)}
            value={value}
          />
        ) : (
          <span
            onClick={() => setIsEditable(true)}
            dangerouslySetInnerHTML={{
              __html: isMarkdown ? parseMarkdown(value) : value
            }}
          />
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
