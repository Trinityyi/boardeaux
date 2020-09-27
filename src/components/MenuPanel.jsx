import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagPanel from './TagPanel';
import EditableText from './EditableText';
import combineClassNames from '@chalarangelo/combine-class-names';
import actions from '../store/actions';
import { exportToJSON, importFromJSON } from '../storage';

const { setMainMenuOpen, setUserName } = actions;

const MenuPanel = ({
  isOpen,
  setMainMenuOpen,
  user,
  setUserName
}) => {
  return (
    <div className={combineClassNames`main-menu-wrapper ${isOpen ? '' : 'hidden'}`}>
      <div className="main-menu-panel">
        <button
          className="btn btn-menu-close icon icon-x"
          onClick={() => setMainMenuOpen(false)}
        />
        <h3 className="main-menu-title">Menu</h3>
        <div className="main-menu-edit-user">
          <h4>User</h4>
          <EditableText
            id="user-name-edit"
            name="user-name-edit"
            value={user.name}
            onChange={value => setUserName('user', value)}
          />
        </div>
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
  setMainMenuOpen: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => {
  return {
    isOpen: state.interface.isMainMenuOpen,
    user: state.users['user']
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMainMenuOpen: bindActionCreators(setMainMenuOpen, dispatch),
    setUserName: bindActionCreators(setUserName, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPanel);
