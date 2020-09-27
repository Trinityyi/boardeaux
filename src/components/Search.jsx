import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import parseTokens from '../utils/search';
import { throttle } from '../utils';
import actions from '../store/actions';

const { setCardModalId } = actions;

const Search = ({
  cards,
  setCardModalId
}) => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);

  useEffect(throttle(() => {
    const q = value.toLowerCase().trim();
    if (q.length <= 1) {
      setResults([]);
      return;
    }
    let res = [];
    if (q.length) {
      let t = parseTokens(q);
      if (t.length && cards && cards.length) {
        res = cards
          .map(card => {
            card.score =
              t.reduce((acc, tkn) => card.tokens.indexOf(tkn) !== -1 ? acc + 1 : acc, 0) / t.length;
            return card;
          })
          .filter(card => card.score > 0.3)
          .sort((a, b) => b.score - a.score).slice(0, 15);
      }
    }
    setResults(res);
  }, 500), [value, cards]);

  return (
    <div className="search-wrapper">
      <input
        defaultValue={ value }
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onKeyUp={ e => {
          setValue(e.target.value);
        } }
      />
      {
        results.length > 0 &&
        <div className="search-result-box">
          <ul>
            {results.map(r => (
              <li
                key={r.id}
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  onClick={e => {
                    e.target.blur();
                    setCardModalId(r.id);
                  }}
                >
                  <div>
                    {r.title}
                    <p>{r.description}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};
Search.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  setCardModalId: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { tags, cards } = state;
  return {
    cards: Object.keys(cards).map(cId => {
      const card = cards[cId];
      const description = card.description.length >= 40 ?
        `${card.description.slice(0, 37)}...`
        : card.description;
      return {
        id: card.id,
        title: card.title,
        description,
        tokens: [
          ...new Set([
            ...parseTokens(card.title),
            ...parseTokens(card.description),
            ...parseTokens(card.tags.map(t => tags[t].name).join(' '))
          ])
        ].join(' ')
      };
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardModalId: bindActionCreators(setCardModalId, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
