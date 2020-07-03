import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a column on the board, containing the provided cards.
 */
const Column = ({
  cards,
  title
}) => {
  return (
    <div className="column">
      <div className="column-title">
        <h3>{title}</h3>
        <button className="btn btn-column-menu icon icon-more-horizontal" />
      </div>
      <ul className="column-content">
        {cards.map(card => (
          <li key={card.id}>{card.title}</li>
        ))}
      </ul>
    </div>
  );
};

Column.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired
};

export default Column;
