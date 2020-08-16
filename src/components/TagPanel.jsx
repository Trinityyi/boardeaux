import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddButton from './AddButton';
import Tag, { TagPropShape } from './Tag';
import actions from '../store/actions';

const { createTag } = actions;

const TagPanel = ({ tags, createTag }) => (
  <div
    className="tag-panel"
  >
    <h4>Tags</h4>
    {tags.map(tag => <Tag tag={tag} key={tag.id}/>)}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagPanel);
