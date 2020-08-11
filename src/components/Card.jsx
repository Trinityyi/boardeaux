import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../store/actions';
import combineClassNames from '@chalarangelo/combine-class-names';
import { priorities } from '../shared';

const { setCardModalId } = actions;

const Card = ({
  card: {
    id,
    title,
    priority
  },
  setCardModalId
}) => {
  return (
    <li
      className={combineClassNames`card ${priorities[priority].toLowerCase()}`}
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
    priority: PropTypes.number.isRequired
  }),
  setCardModalId: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setCardModalId: bindActionCreators(setCardModalId, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Card);
