import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../store/actions';
import Column from './Column';

const { createCard, createColumn } = actions;

const MainArea = ({
  cards,
  createCard,
  columns,
  createColumn
}) => {
  useEffect(() => {
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
  }, [createCard, createColumn]);
  return (
    <main>
      <div className="main-area-content">
        {Object.values(columns).map(({ id, title, cardIds }) => (
          <Column
            id={id}
            key={id}
            title={title}
            cards={cardIds.map(cId => cards[cId])}
          />
        ))}
      </div>
    </main>
  );
};

MainArea.propTypes = {
  cards: PropTypes.shape({}).isRequired,
  columns: PropTypes.shape({}).isRequired,
  createCard: PropTypes.func.isRequired,
  createColumn: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    cards: state.cards,
    columns: state.columns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCard: bindActionCreators(createCard, dispatch),
    createColumn: bindActionCreators(createColumn, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainArea);
