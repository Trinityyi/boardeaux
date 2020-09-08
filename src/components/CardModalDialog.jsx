import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import EditableText from './EditableText';
import actions from '../store/actions';
import TagInput from './TagInput';
import combineClassNames from '@chalarangelo/combine-class-names';
import { priorities } from '../shared';
import { TagPropShape } from './Tag';
import { haveSameContents, difference } from '../utils';

const {
  setCardModalId,
  setCardTitle,
  setCardDescription,
  setCardPriority,
  addTag,
  removeTag,
  archiveCard,
  restoreCard,
  deleteCard,
  logCardActivity
} = actions;

const CardModalDialog = ({
  id,
  card,
  tags,
  setCardModalId,
  setCardTitle,
  setCardDescription,
  setCardPriority,
  addTag,
  removeTag,
  archiveCard,
  restoreCard,
  deleteCard,
  logCardActivity
}) => {
  const myRef = React.createRef();
  const isOpen = Boolean(id);

  const [lastTitle, setLastTitle] = useState(null);
  const [lastTags, setLastTags] = useState(null);

  return (
    <Modal
      className={combineClassNames`modal-card-dialog ${!isOpen ? 'hidden' : ''}`}
      id={`card-modal-${id}`}
      onClose={() => setCardModalId(null)}
    >
      { isOpen &&
        <>
          <div className="modal-card-section">
            <label htmlFor="card-modal-title" className=" for-editable icon icon-hexagon">
              Title
            </label>
            <h2 className="modal-card-title">
              <EditableText
                id="card-modal-title"
                name="card-modal-title"
                value={card.title}
                onChange={value => setCardTitle(id, value)}
                onEditableEnter={() => setLastTitle(card.title)}
                onEditableExit={() => {
                  if(lastTitle !== card.title)
                    logCardActivity(id, `Renamed card from ${lastTitle} to ${card.title}.`);
                  setLastTitle(card.title);
                }}
                cRef={myRef}
                placeholder="Add a title"
              />
            </h2>
          </div>
          <div className="modal-card-section">
            <label htmlFor="card-modal-description" className="for-editable icon icon-align-left">
              Description
            </label>
            <EditableText
              id="card-modal-description"
              className="modal-card-description"
              name="card-modal-description"
              placeholder="Add a description"
              value={card.description}
              onChange={value => setCardDescription(id, value)}
              isDefaultEditable={!card.description.length}
              isMultiline
              isMarkdown
              remainEditableWhileEmpty
            />
          </div>
          <div className="modal-card-section">
            <label htmlFor="card-modal-tags" className="for-editable icon icon-tag">
              Tags
            </label>
            <div>
              <TagInput
                id="card-modal-tags"
                tags={card.tags.map(tag => tags.find(t => tag === t.id))}
                suggestions={tags}
                onDelete={i => { removeTag(id, card.tags[i]); }}
                onAddition={tag => {
                  if (!card.tags.some(t => tag.id === t))
                    addTag(id, tag.id);
                }}
                onFocus={() => setLastTags(card.tags)}
                onBlur={() => {
                  if (!haveSameContents(lastTags, card.tags)) {
                    const added = difference(card.tags, lastTags);
                    const removed = difference(lastTags, card.tags);
                    let message = [];
                    if (added.length) message.push(`added tags ${added.map(tag => tags.find(t => tag === t.id).name).join(', ')}`);
                    if (removed.length) message.push(`removed tags ${removed.map(tag => tags.find(t => tag === t.id).name).join(', ')}`);
                    message = message.join(' and ');
                    console.log(message);
                    message = `${message[0].toUpperCase()}${message.slice(1)}`;
                    message += ` to ${card.title}.`;
                    logCardActivity(id, message);
                  }
                  setLastTags(card.tags);
                }}
              />
            </div>
          </div>
          <div className="modal-card-section">
            <label htmlFor="card-modal-priority" className="for-editable icon icon-alert-circle">
            Priority
            </label>
            <select
              name="card-modal-priority"
              id="card-modal-priority"
              onChange={e => setCardPriority(id, parseInt(e.target.value))}
              value={card.priority}
            >
              {priorities.map(
                (priority, i) => (
                  <option key={i} value={i}>{priority}</option>
                ))}
            </select>
          </div>

          <div className="modal-card-section">
            <label className="for-editable icon icon-briefcase">
            Actions
            </label>
            {!card.archived ? (
              <button
                className="btn btn-archive icon icon-archive"
                onClick={() => archiveCard(id)}
              >
              Archive
              </button>
            ) : (
              <>
                <button
                  className="btn btn-restore icon icon-rotate-ccw"
                  onClick={() => restoreCard(id)}
                >
                Restore
                </button>
                <button
                  className="btn btn-delete icon icon-trash"
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    const sure = confirm('Are you sure?');
                    if(sure) deleteCard(id);
                  }}
                >
                  Delete
                </button>
              </>
            )
            }
          </div>

          <div className="modal-card-section">
            <label className="icon icon-list">
              Activity log
            </label>
            <ul className="modal-card-activity-log">
              { Boolean(card.activityLog && card.activityLog.length) &&
                card.activityLog
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map(({ text, timestamp }, i) => (
                    <li key={`${i}${timestamp}`}>
                      {text}
                      <small>{new Date(timestamp).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      } )}</small>
                    </li>
                  ))
              }
            </ul>
          </div>
          <div className="modal-card-section">
            <label className="icon icon-credit-card id-label">
              Card ID: {card.id}
            </label>
          </div>
        </>
      }
    </Modal>
  );
};

CardModalDialog.propTypes = {
  id: PropTypes.string,
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  tags: PropTypes.arrayOf(TagPropShape).isRequired,
  setCardModalId: PropTypes.func.isRequired,
  setCardTitle: PropTypes.func.isRequired,
  setCardDescription: PropTypes.func.isRequired,
  setCardPriority: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  archiveCard: PropTypes.func.isRequired,
  restoreCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  logCardActivity: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    id: state.interface.cardModalId,
    card: state.cards[state.interface.cardModalId],
    tags: Object.keys(state.tags).map(key => state.tags[key])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardModalId: bindActionCreators(setCardModalId, dispatch),
    setCardTitle: bindActionCreators(setCardTitle, dispatch),
    setCardDescription: bindActionCreators(setCardDescription, dispatch),
    setCardPriority: bindActionCreators(setCardPriority, dispatch),
    addTag: bindActionCreators(addTag, dispatch),
    removeTag: bindActionCreators(removeTag, dispatch),
    archiveCard: bindActionCreators(archiveCard, dispatch),
    restoreCard: bindActionCreators(restoreCard, dispatch),
    deleteCard: bindActionCreators(deleteCard, dispatch),
    logCardActivity: bindActionCreators(logCardActivity, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModalDialog);
