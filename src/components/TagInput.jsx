import React from 'react';
import PropTypes from 'prop-types';
import ReactTags from 'react-tag-autocomplete';

const TagPropShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string
});

const Tag = ({ tag, onDelete }) => (
  <span
    className="tag icon icon-x"
    onClick={onDelete}
    style={{
      color: tag.color,
      backgroundColor: tag.backgroundColor
    }}>
    {tag.name}
  </span>
);

const TagInput = ({
  id,
  tags,
  suggestions,
  onDelete,
  onAddition
}) => {
  return (
    <ReactTags
      id={id}
      tags={tags}
      suggestions={suggestions}
      suggestionsTransform={(query, suggestions) => {
        const validSuggestions = suggestions.filter(s => !tags.some(t => t.id === s.id));
        return validSuggestions.filter(s => new RegExp(`^${query}`, 'gi').test(s.name));
      }}
      maxSuggestionsLength={8}
      onDelete={onDelete}
      onAddition={onAddition}
      classNames={{
        root: 'tag-input-wrapper',
        rootFocused: 'is-focused',
        selected: 'tag-input-selection',
        selectedTag: 'tag',
        selectedTagName: 'tag-input-selected-tag-name',
        search: 'tag-input-search',
        searchWrapper: 'tag-input-search-wrapper',
        searchInput: 'tag-input-field',
        suggestions: 'tag-input-suggestions',
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
  id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(TagPropShape),
  suggestions: PropTypes.arrayOf(TagPropShape),
  onDelete: PropTypes.func.isRequired,
  onAddition: PropTypes.func.isRequired
};

export default TagInput;
