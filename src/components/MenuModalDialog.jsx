import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import actions from '../store/actions';
import { exportToJSON, importFromJSON } from '../storage';

const { setMainMenuOpen } = actions;

const MenuModalDialog = ({
  isOpen
}) => {
  if (!isOpen) return null;
  return (
    <Modal
      container={document.getElementById('main-menu-root')}
      id="main-menu-modal"
      onClose={() => setMainMenuOpen(false)}
    >
      <h3>Menu</h3>
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
    </Modal>
  );
};

MenuModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuModalDialog);
