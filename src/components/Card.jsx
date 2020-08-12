import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import actions from '../store/actions';
import combineClassNames from '@chalarangelo/combine-class-names';
import { priorities } from '../shared';

const { setCardModalId, removeCardFromColumn } = actions;

const Card = ({
  card: {
    id,
    title,
    priority
  },
  columnId,
  setCardModalId,
  removeCardFromColumn
}) => {
  const [{ opacity }, drag] = useDrag({
    item: { id, type: 'card', sourceColumnId: columnId },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) removeCardFromColumn(item.id, columnId);
    }
  });
  return (
    <li
      className={combineClassNames`card ${priorities[priority].toLowerCase()}`}
      id={id}
      ref={drag}
      style={{ opacity }}
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
  columnId: PropTypes.string.isRequired,
  setCardModalId: PropTypes.func.isRequired,
  removeCardFromColumn: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setCardModalId: bindActionCreators(setCardModalId, dispatch),
    removeCardFromColumn: bindActionCreators(removeCardFromColumn, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Card);
