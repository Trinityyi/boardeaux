import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import EditableText from './EditableText';
import actions from '../store/actions';

const { setCardModalId, setCardTitle, setCardDescription } = actions;

const CardModalDialog = ({
  id,
  card,
  setCardModalId,
  setCardTitle,
  setCardDescription
}) => {
  const myRef = React.createRef();
  if (!id) return null;
  return (
    <Modal
      className="modal-card-dialog"
      id={`card-modal-${id}`}
      onClose={() => setCardModalId(null)}
    >
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
            cRef={myRef}
          />
        </h2>
      </div>
      <div className="modal-card-section">
        <label htmlFor="card-modal-description" className="for-editable icon icon-align-left">Description</label>
        <EditableText
          id="card-modal-description"
          className="modal-card-description"
          name="card-modal-description"
          value={card.description}
          onChange={value => setCardDescription(id, value)}
          isDefaultEditable={!card.description.length}
          isMultiline
          isMarkdown
          remainEditableWhileEmpty
        />
      </div>
      <div className="modal-card-section">
        <label className="icon icon-credit-card id-label">
          Card ID: {card.id}
        </label>
      </div>
    </Modal>
  );
};

CardModalDialog.propTypes = {
  id: PropTypes.string,
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  setCardModalId: PropTypes.func.isRequired,
  setCardTitle: PropTypes.func.isRequired,
  setCardDescription: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    id: state.interface.cardModalId,
    card: state.cards[state.interface.cardModalId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardModalId: bindActionCreators(setCardModalId, dispatch),
    setCardTitle: bindActionCreators(setCardTitle, dispatch),
    setCardDescription: bindActionCreators(setCardDescription, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModalDialog);
