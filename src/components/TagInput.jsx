import React from 'react';
import PropTypes from 'prop-types';
import ReactTags from 'react-tag-autocomplete';
import Tag, { TagPropShape } from './Tag';

const TagInput = ({
  id,
  tags,
  suggestions,
  onDelete,
  onAddition,
  onFocus = () => {},
  onBlur = () => {}
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
      minQueryLength={0}
      onDelete={onDelete}
      onAddition={onAddition}
      onFocus={onFocus}
      onBlur={onBlur}
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
  onAddition: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default TagInput;
