import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import Card from './Card';
import AddButton from './AddButton';
import actions from '../store/actions';

const { createCard, addCardToColumn } = actions;

/**
 * Renders a column on the board, containing the provided cards.
 */
const Column = ({
  id,
  cards,
  title,
  createCard,
  addCardToColumn
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['card'],
    canDrop: item => item.sourceColumnId !== id,
    drop: item => {
      addCardToColumn(item.id, id);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div className="column">
      <div className="column-title">
        <h3>{title}</h3>
        <button className="btn btn-column-menu icon icon-more-horizontal" />
      </div>
      <ul className="column-content" ref={drop}>
        {cards.map(card => (
          <Card key={card.id} card={card} columnId={id}/>
        ))}
      </ul>
      <AddButton
        id={`btn-${id}`}
        name={`btn-${id}`}
        onSubmit={cardTitle => createCard({ title: cardTitle }, id)}
        buttonText="Add a card"
        wrapperClassName="column-action-add"
        buttonClassName="btn-column-add"
        inputClassName="input-column-add"
      />
    </div>
  );
};

Column.propTypes = {
  id: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired,
  createCard: PropTypes.func.isRequired,
  addCardToColumn: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    createCard: bindActionCreators(createCard, dispatch),
    addCardToColumn: bindActionCreators(addCardToColumn, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Column);
