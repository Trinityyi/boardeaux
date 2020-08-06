import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../store/actions';

const { setCardModalId } = actions;

const Card = ({
  card: {
    id,
    title
  },
  setCardModalId
}) => {
  return (
    <li
      className="card"
      id={id}
      onClick={() => setCardModalId(id)}
    >
      {title}
    </li>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  setCardModalId: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setCardModalId: bindActionCreators(setCardModalId, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Card);
