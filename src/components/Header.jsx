import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditableText from './EditableText';
import {setBoardName} from '../store';
import logo from '../assets/logo.png';

const Header = ({
  name,
  setBoardName
}) => {
  return (
    <header>
      <img src={logo} alt="Boardeaux" className="logo"/>
      <h2 className="board-name">
        <i className="icon icon-layout" />
        <EditableText
          id="board-name"
          name="board-name"
          value={name}
          onChange={setBoardName}
        />
      </h2>
      <div className="controls">
        <i className="icon icon-search" />
        <input
          type="search"
          placeholder="Search..."
        />
        <button className="btn btn-menu icon icon-more-horizontal" />
      </div>
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  setBoardName: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {name: state.name};
};

const mapDispatchToProps = dispatch => {
  return { setBoardName: bindActionCreators(setBoardName, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
