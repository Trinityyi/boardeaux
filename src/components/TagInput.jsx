import React from 'react';
import PropTypes from 'prop-types';
import ReactTags from 'react-tag-autocomplete';

const TagPropShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string
});

const Tag = ({ tag, onDelete }) => (
  <span
    className="task-label icon icon-x"
    onClick={onDelete}
    style={{
      color: tag.color,
      backgroundColor: tag.backgroundColor
    }}>
    {tag.name}
  </span>
);

const TagInput = ({
  tags,
  suggestions,
  onDelete,
  onAddition
}) => {
  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      suggestionsTransform={(query, suggestions) => {
        const validSuggestions = suggestions.filter(s => !tags.some(t => t.id === s.id));
        const matcher = new RegExp(`^${query}`, 'gi');
        return validSuggestions.filter(s => matcher.test(s.name));
      }}
      onDelete={onDelete}
      onAddition={onAddition}
      classNames={{
        root: 'react-tags',
        rootFocused: 'is-focused',
        selected: 'react-tags__selected',
        selectedTag: 'task-label',
        selectedTagName: 'react-tags__selected-tag-name',
        search: 'react-tags__search',
        searchWrapper: 'react-tags__search-wrapper',
        searchInput: 'react-tags__search-input',
        suggestions: 'react-tags__suggestions',
        suggestionActive: 'is-active',
        suggestionDisabled: 'is-disabled'
      }}
      tagComponent={Tag}
      autoresize={false}
      allowBackspace={false}
    />
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(TagPropShape),
  suggestions: PropTypes.arrayOf(TagPropShape),
  onDelete: PropTypes.func.isRequired,
  onAddition: PropTypes.func.isRequired
};

export default TagInput;
