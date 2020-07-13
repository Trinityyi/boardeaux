import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import EditableText from './EditableText';
import {setCardModalId, setCardTitle} from '../store';

const CardModalDialog = ({
  id,
  card,
  setCardModalId,
  setCardTitle
}) => {
  if (!id) return null;
  return (
    <Modal
      container={document.getElementById('modal-root')}
      id={`card-modal-${id}`}
      onClose={() => setCardModalId(null)}
    >
      <h2>
        <EditableText
          id="card-modal-title"
          name="card-modal-title"
          value={card.title}
          onChange={value => {
            setCardTitle(id, value);
          }}
        />
      </h2>

    </Modal>
  );
};

CardModalDialog.propTypes = {
  id: PropTypes.string,
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  setCardModalId: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    id: state.cardModalId,
    card: state.cards[state.cardModalId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardModalId: bindActionCreators(setCardModalId, dispatch),
    setCardTitle: bindActionCreators(setCardTitle, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModalDialog);
