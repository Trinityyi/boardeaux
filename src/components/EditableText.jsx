import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import combineClassNames from '@chalarangelo/combine-class-names';
import useClickOutside from '../hooks/useClickOutside';
import useClickSelector from '../hooks/useClickSelector';
import { parseMarkdown } from '../utils';

/**
 * Renders a stateful component that toggles between editable and view-only on
 * click. Editing the value runs the passed onChange handler and should update
 * the input field's value (controlled input), otherwise it will not work
 * correctly.
 */
const EditableText = ({
  id,
  className = '',
  name,
  placeholder = '',
  value,
  onChange,
  isDefaultEditable = false,
  isMultiline = false,
  isMarkdown = false,
  remainEditableWhileEmpty = false
}) => {
  const [isEditable, setIsEditable] = useState(isDefaultEditable);
  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    if (isEditable && (!remainEditableWhileEmpty || value.trim().length)) setIsEditable(false);
  });
  useClickSelector(clickRef, `label[for="${id}"]`, () => {
    if(!isEditable) setIsEditable(true);
  });

  const EditableField = isMultiline ? 'textarea' : 'input';
  return (
    <div className={combineClassNames`editable-text-wrapper ${className}`} ref={clickRef}>
      {
        isEditable ? (
          <EditableField
            type="text"
            name={name}
            id={id}
            onChange={e => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
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
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDefaultEditable: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isMarkdown: PropTypes.bool,
  remainEditableWhileEmpty: PropTypes.bool,
};

export default EditableText;
