import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import {setCardModalId} from '../store';

const CardModalDialog = ({
  id,
  card,
  setCardModalId
}) => {
  if (!id) return null;
  return (
    <Modal
      container={document.getElementById('modal-root')}
      id={`card-modal-${id}`}
      onClose={() => setCardModalId(null)}
    >
      <h1>{card.title}</h1>
    </Modal>
  );
};

CardModalDialog.propTypes = {
  id: PropTypes.string.isRequired,
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
    setCardModalId: bindActionCreators(setCardModalId, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModalDialog);
