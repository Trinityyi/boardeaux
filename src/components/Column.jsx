import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import Card from './Card';
import AddButton from './AddButton';
import actions from '../store/actions';
import combineClassNames from '@chalarangelo/combine-class-names';

const {
  createCard,
  addCardToColumn,
  moveCardInsideColumn,
  setHoveredCard,
  setDraggedCard
} = actions;

/**
 * Renders a column on the board, containing the provided cards.
 */
const Column = ({
  id,
  cards,
  title,
  tags,
  hoveredCardId = null,
  hoveredCardState = false,
  draggedCard = null,
  createCard,
  addCardToColumn,
  setHoveredCard,
  setDraggedCard,
  moveCardInsideColumn
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ['card'],
    canDrop: item => item.sourceColumnId !== id,
    drop: (item, monitor) => {
      if (!monitor.canDrop()) return;
      const hasBeenHandled = monitor.didDrop() && monitor.getDropResult().handled;
      if (!hasBeenHandled) addCardToColumn(item.id, id, hoveredCardState.index);
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    }),
  });

  const isEmptyHovered = !cards.length && isOver && draggedCard !== null;

  return (
    <div className="column">
      <div className="column-title">
        <h3>{title}</h3>
        <button className="btn btn-column-menu icon icon-more-horizontal" />
      </div>
      <ul
        className={combineClassNames`column-content ${isEmptyHovered ? 'hover' : ''}`}
        ref={drop}
        style={{ height: isEmptyHovered ? draggedCard.height : '' }}
      >
        {cards.filter(card => !card.archived).map((card, i) => (
          <Card
            key={card.id}
            card={{ ...card, tags: card.tags.map(t => tags[t]) }}
            columnId={id}
            index={i}
            previewHeight={draggedCard !== null ? draggedCard.height : 0}
            isHovered={hoveredCardId === card.id ? hoveredCardState : false}
            setIsHovered={hovered => setHoveredCard(card.id, hovered)}
            setDraggedCard={setDraggedCard}
            isDragging={draggedCard !== null}
            handleDrop={moveCardInsideColumn}
          />
        ))}
      </ul>
      <AddButton
        id={`btn-${id}`}
        name={`btn-${id}`}
        onSubmit={cardTitle => createCard({ title: cardTitle }, id)}
        buttonText="Add a card"
        submitText="Add Card"
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
  tags: PropTypes.shape({}).isRequired,
  hoveredCardId: PropTypes.string,
  hoveredCardState: PropTypes.oneOfType([
    PropTypes.shape({
      position: PropTypes.string,
      index: PropTypes.number
    }),
    PropTypes.bool
  ]),
  draggedCard: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      height: PropTypes.number
    }),
    PropTypes.bool
  ]),
  createCard: PropTypes.func.isRequired,
  addCardToColumn: PropTypes.func.isRequired,
  setHoveredCard: PropTypes.func.isRequired,
  setDraggedCard: PropTypes.func.isRequired,
  moveCardInsideColumn: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    hoveredCardId: state.interface.hoveredCardId,
    draggedCard: state.interface.draggedCard,
    hoveredCardState: state.interface.hoveredCardState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCard: bindActionCreators(createCard, dispatch),
    addCardToColumn: bindActionCreators(addCardToColumn, dispatch),
    setHoveredCard: bindActionCreators(setHoveredCard, dispatch),
    setDraggedCard: bindActionCreators(setDraggedCard, dispatch),
    moveCardInsideColumn: bindActionCreators(moveCardInsideColumn, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Column);
