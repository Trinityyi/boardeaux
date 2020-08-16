import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import actions from '../store/actions';
import combineClassNames from '@chalarangelo/combine-class-names';
import { priorities } from '../shared';
import Tag, { TagPropShape } from './Tag';

const { setCardModalId, removeCardFromColumn } = actions;

const Card = ({
  card: {
    id,
    title,
    priority,
    tags
  },
  columnId,
  index,
  setCardModalId,
  removeCardFromColumn,
  previewHeight = 0,
  isHovered = false,
  setIsHovered,
  isDragging = false,
  setDraggedCard,
  handleDrop
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ['card'],
    hover(item, monitor) {
      if (!ref.current) return;
      const isFromDifferentSource = !monitor.canDrop();
      if (!isFromDifferentSource && item.index === index) return;

      const { top, bottom } = ref.current.querySelector('.card').getBoundingClientRect();
      const hoverMiddleY = (bottom - top) / 2 + top;
      const clientOffsetY = monitor.getClientOffset().y;

      if (clientOffsetY < hoverMiddleY)
        setIsHovered({ position: 'before', index });
      else if (clientOffsetY > hoverMiddleY)
        setIsHovered({ position: 'after', index: index + 1 });
    },
    canDrop: item => item.sourceColumnId === columnId && item.index !== isHovered.index,
    collect: monitor => {
      if (!ref.current) return;
      if (monitor.didDrop() || !isDragging) setIsHovered(false);
    },
    drop: item => {
      handleDrop(item.id, columnId, isHovered.index);
      setIsHovered(false);
      return { handled: true, isSameColumn: true };
    }
  });

  const [style, drag] = useDrag({
    item: { id, type: 'card', sourceColumnId: columnId, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
      display: monitor.isDragging() ? 'none' : 'block'
    }),
    begin: () => {
      if (!ref.current) return;
      const { height } = ref.current.getBoundingClientRect();
      setDraggedCard({ id, height });
    },
    end: (item, monitor) => {
      const hasChangedColumn = monitor.didDrop() && !monitor.getDropResult().isSameColumn;
      if (hasChangedColumn) removeCardFromColumn(item.id, columnId);
      setDraggedCard(null);
    }
  });

  drag(drop(ref));

  return (
    <li className="card-wrapper" ref={ref}>
      {
        isHovered && isHovered.position === 'before' &&
        <div className="card-preview" style={{ height: previewHeight }}/>
      }
      <div
        className={combineClassNames`card ${priorities[priority].toLowerCase()}`}
        id={id}
        ref={ref}
        style={style}
        onClick={() => setCardModalId(id)}
      >
        {title}
        <div className="card-tag-wrapper">
          {tags.map(tag => <Tag tag={tag} key={tag.id}/>)}
        </div>
      </div>
      {
        isHovered && isHovered.position === 'after' &&
        <div className="card-preview" style={{ height: previewHeight }}/>
      }
    </li>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(TagPropShape).isRequired
  }),
  columnId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setCardModalId: PropTypes.func.isRequired,
  removeCardFromColumn: PropTypes.func.isRequired,
  previewHeight: PropTypes.number,
  isHovered: PropTypes.oneOfType([
    PropTypes.shape({
      position: PropTypes.string,
      index: PropTypes.number
    }),
    PropTypes.bool
  ]),
  setIsHovered: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  setDraggedCard: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    setCardModalId: bindActionCreators(setCardModalId, dispatch),
    removeCardFromColumn: bindActionCreators(removeCardFromColumn, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Card);
