import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Boardeaux" className="logo"/>
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

};

export default Header;
