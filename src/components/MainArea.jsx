import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../store/actions';
import Column from './Column';
import AddButton from './AddButton';

const {
  createCard,
  createColumn,
  createTag,
  setHoveredColumn,
  setDraggedColumn,
  moveColumnInsideBoard
} = actions;

const init = false;

const MainArea = ({
  cards,
  columns,
  boardColumns,
  tags,
  createCard,
  createColumn,
  createTag,
  setHoveredColumn,
  setDraggedColumn,
  hoveredColumnId,
  draggedColumn,
  hoveredColumnState,
  moveColumnInsideBoard
}) => {
  useEffect(() => {
    if(!init) return;
    const mdTest = [
      'Testing markdown.',
      'This has **bold text**.',
      'This is _italics_.',
      '\nNew paragraph',
      '\n#### Title 4',
      '\n- List item 1',
      '- List item 2',
      '\nNew paragraph',
      '\n1. First',
      '2. Second',
      '\nNew paragraph',
      '\n- [ ] Not complete yet',
      '- [x] Completed'
    ].join('\n');

    const columnIds = [
      createColumn({ title: 'To Do' }),
      createColumn({ title: 'In Progress' }),
      createColumn({ title: 'Done' })
    ].map(x => x.id);
    createCard({ title: 'Hallo' }, columnIds[0]);
    createCard({ title: 'Hola', description: mdTest }, columnIds[0]);
    createCard({ title: 'Gulp' }, columnIds[0]);
    createCard({ title: 'Start' }, columnIds[1]);
    createCard({ title: 'Stop' }, columnIds[1]);
    createCard({ title: 'Tada' }, columnIds[2]);
    createTag({ name: 'USA' });
    createTag({ name: 'Germany' });
    createTag({ name: 'Georgia' });
    createTag({ name: 'Austria' });
    createTag({ name: 'Costa Rica' });
    createTag({ name: 'Sri Lanka' });
    createTag({ name: 'Thailand' });
  }, [createCard, createColumn, createTag]);
  return (
    <main>
      <div className="main-area-content">
        { boardColumns.map(id => columns[id]).map(({ id, title, cardIds }, i) => (
          <Column
            id={id}
            key={id}
            index={i}
            title={title}
            cards={cardIds.map(cId => cards[cId])}
            tags={tags}
            previewHeight={draggedColumn !== null ? draggedColumn.height : 0}
            isHovered={hoveredColumnId === id ? hoveredColumnState : false}
            setIsHovered={hovered => setHoveredColumn(id, hovered)}
            setDraggedColumn={setDraggedColumn}
            isDragging={draggedColumn !== null}
            handleDrop={moveColumnInsideBoard}
          />
        ))}
        <AddButton
          id="btn-add-column"
          name="btn-add-column"
          onSubmit={columnTitle => createColumn({ title: columnTitle })}
          buttonText="Add a column"
          submitText="Add Column"
          wrapperClassName="column-wrapper add-column-wrapper"
          buttonClassName="btn-add-column"
          inputClassName="input-add-column"
        />
      </div>
    </main>
  );
};

MainArea.propTypes = {
  cards: PropTypes.shape({}).isRequired,
  columns: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
  createCard: PropTypes.func.isRequired,
  createColumn: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  setHoveredColumn: PropTypes.func.isRequired,
  setDraggedColumn: PropTypes.func.isRequired,
  hoveredColumnId: PropTypes.string,
  draggedColumn: PropTypes.any,
  hoveredColumnState: PropTypes.any
};

const mapStateToProps = state => {
  return {
    cards: state.cards,
    columns: state.columns,
    boardColumns: state.board.columnIds,
    tags: state.tags,
    hoveredColumnId: state.interface.hoveredColumnId,
    draggedColumn: state.interface.draggedColumn,
    hoveredColumnState: state.interface.hoveredColumnState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCard: bindActionCreators(createCard, dispatch),
    createColumn: bindActionCreators(createColumn, dispatch),
    createTag: bindActionCreators(createTag, dispatch),
    setHoveredColumn: bindActionCreators(setHoveredColumn, dispatch),
    setDraggedColumn: bindActionCreators(setDraggedColumn, dispatch),
    moveColumnInsideBoard: bindActionCreators(moveColumnInsideBoard, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainArea);
