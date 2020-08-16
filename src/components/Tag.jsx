import React from 'react';
import PropTypes from 'prop-types';
import combineClassNames from '@chalarangelo/combine-class-names';

export const TagPropShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string
});

const Tag = ({ tag, onDelete }) => (
  <span
    className={combineClassNames`tag ${onDelete ? 'closable icon icon-x' : ''}`}
    onClick={onDelete ? onDelete : null}
    style={{
      color: tag.color,
      backgroundColor: tag.backgroundColor
    }}
  >
    {tag.name}
  </span>
);

Tag.propTypes = {
  tag: TagPropShape.isRequired,
  onDelete: PropTypes.func
};

export default Tag;
