import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import Card from './Card';
import AddButton from './AddButton';
import EditableText from './EditableText';
import actions from '../store/actions';
import combineClassNames from '@chalarangelo/combine-class-names';

const {
  createCard,
  addCardToColumn,
  moveCardInsideColumn,
  setHoveredCard,
  setDraggedCard,
  setColumnTitle
} = actions;

/**
 * Renders a column on the board, containing the provided cards.
 */
const Column = ({
  id,
  index,
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
  moveCardInsideColumn,
  previewHeight = 0,
  isHovered = false,
  setIsHovered,
  isDragging = false,
  setDraggedColumn,
  handleDrop,
  setColumnTitle
}) => {
  const ref = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: ['card', 'column'],
    canDrop: item => (item.type === 'column' && item.index !== isHovered.index) || (item.type === 'card' && item.sourceColumnId !== id),
    hover: (item, monitor) => {
      if (!ref.current || item.type !== 'column' || item.index === index) return;

      const { left, right } = ref.current.querySelector('.column').getBoundingClientRect();
      const hoverMiddleX = (right - left) / 2 + left;
      const clientOffsetX = monitor.getClientOffset().x;

      if (clientOffsetX < hoverMiddleX)
        setIsHovered({ position: 'before', index });
      else if (clientOffsetX > hoverMiddleX)
        setIsHovered({ position: 'after', index: index + 1 });

    },
    drop: (item, monitor) => {
      if(item.type === 'card') {
        if (!monitor.canDrop()) return;
        const hasBeenHandled = monitor.didDrop() && monitor.getDropResult().handled;
        if (!hasBeenHandled) addCardToColumn(item.id, id, hoveredCardState.index);
      }
      if(item.type === 'column' && item.index !== isHovered.index) {
        handleDrop(item.id, isHovered.index);
        setIsHovered(false);
        return { handled: true };
      }
    },
    collect: monitor => {
      if (!ref.current) return { isOver: monitor.isOver() };
      if (monitor.didDrop() || !isDragging) setIsHovered(false);
      return { isOver: monitor.isOver() };
    },
  });

  const [style, drag] = useDrag({
    item: { id, type: 'column', index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
      display: monitor.isDragging() ? 'none' : 'block'
    }),
    begin: () => {
      if (!ref.current) return;
      const { height } = ref.current.getBoundingClientRect();
      setDraggedColumn({ id, height });
    },
    end: () => {
      setDraggedColumn(null);
    }
  });

  drag(drop(ref));

  const isEmptyHovered = !cards.length && isOver && draggedCard !== null;

  return (
    <div
      className={combineClassNames`column-wrapper ${isHovered ? 'with-previews' : ''}`}
      ref={ref}
      style={{ ...style, display: isHovered ? 'flex' : style.display }}
    >
      {
        isHovered && isHovered.position === 'before' &&
        <div className="column-preview" style={{ height: previewHeight }}/>
      }
      <div className="column">
        <div className="column-title">
          <h3>
            <EditableText
              id={`column-name-${id}`}
              name={`column-name-${id}`}
              value={title}
              onChange={val => {
                setColumnTitle(id, val);
              }}
            />
          </h3>
          <button className="btn btn-column-menu icon icon-more-horizontal" />
        </div>
        <ul
          className={combineClassNames`column-content ${isEmptyHovered ? 'hover' : ''}`}
          ref={ref}
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
      {
        isHovered && isHovered.position === 'after' &&
        <div className="column-preview" style={{ height: previewHeight }}/>
      }
    </div>
  );
};

Column.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
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
  moveCardInsideColumn: PropTypes.func.isRequired,
  setColumnTitle: PropTypes.func.isRequired
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
    moveCardInsideColumn: bindActionCreators(moveCardInsideColumn, dispatch),
    setColumnTitle: bindActionCreators(setColumnTitle, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Column);
