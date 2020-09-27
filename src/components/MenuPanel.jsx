import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagPanel from './TagPanel';
import combineClassNames from '@chalarangelo/combine-class-names';
import actions from '../store/actions';
import { exportToJSON, importFromJSON } from '../storage';

const { setMainMenuOpen } = actions;

const MenuPanel = ({
  isOpen,
  setMainMenuOpen
}) => {
  return (
    <div className={combineClassNames`main-menu-wrapper ${isOpen ? '' : 'hidden'}`}>
      <div className="main-menu-panel">
        <button
          className="btn btn-menu-close icon icon-x"
          onClick={() => setMainMenuOpen(false)}
        />
        <h3 className="main-menu-title">Menu</h3>
        <TagPanel />
        <h4>Actions</h4>
        <button
          className="main-menu-btn btn btn-save icon icon-download"
          onClick={() => exportToJSON()}
        >
          Export as JSON
        </button>
        <input
          type="file"
          id="main-menu-load-json"
          style={{ display: 'none' }}
          accept="application/json"
          onChange={e => importFromJSON(e.target.files) }
        />
        <button
          className="main-menu-btn btn btn-load icon icon-upload"
          onClick={() => document.getElementById('main-menu-load-json').click()}
        >
          Load from JSON
        </button>
      </div>
    </div>
  );
};

MenuPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setMainMenuOpen: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isOpen: state.interface.isMainMenuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMainMenuOpen: bindActionCreators(setMainMenuOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPanel);
