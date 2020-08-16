import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddButton from './AddButton';
import Tag, { TagPropShape } from './Tag';
import Popover from './Popover';
import actions from '../store/actions';

const { createTag, setTagColors, setTagName } = actions;

const TagPanel = ({
  tags,
  createTag,
  setTagColors,
  setTagName
}) => (
  <div
    className="tag-panel"
  >
    <h4>Tags</h4>
    {tags.map(tag =>
      <Popover
        key={tag.id}
        id={`tag-popover-${tag.id}`}
        popoverContent={(
          <>
            <label htmlFor={`tag-name-input-${tag.id}`}>Name:</label>
            <input
              type="name"
              id={`tag-name-input-${tag.id}`}
              name={`tag-name-input-${tag.id}`}
              value={tag.name}
              onChange={e => setTagName(tag.id, e.target.value )}
            />
            <label htmlFor={`tag-bg-input-${tag.id}`}>Color:</label>
            <input
              type="color"
              id={`tag-bg-input-${tag.id}`}
              name={`tag-bg-input-${tag.id}`}
              value={tag.backgroundColor}
              data-background-color={tag.backgroundColor}
              onChange={e => setTagColors(tag.id, e.target.value )}
            />
          </>
        )}
      >
        <Tag tag={tag} />
      </Popover>
    )}
    <AddButton
      id="btn-add-tag"
      name="btn-add-tag"
      onSubmit={tagName => createTag({ name: tagName })}
      buttonText="Create new tag"
      submitText="Add Tag"
      wrapperClassName="tag-panel-action-add"
      buttonClassName="btn-tag-panel-add"
      inputClassName="tag-panel-add"
    />
  </div>
);

TagPanel.propTypes = {
  tags: PropTypes.arrayOf(TagPropShape).isRequired,
  createTag: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    tags: Object.keys(state.tags).map(key => state.tags[key])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTag: bindActionCreators(createTag, dispatch),
    setTagColors: bindActionCreators(setTagColors, dispatch),
    setTagName: bindActionCreators(setTagName, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagPanel);
