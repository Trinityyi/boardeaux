import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  card: {
    id,
    title
  }
}) => {
  return (
    <li id={id}>{title}</li>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export default Card;
