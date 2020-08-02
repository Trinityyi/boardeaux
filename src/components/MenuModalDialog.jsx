import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import actions from '../store/actions';
import { exportToJSON } from '../storage';

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
      <button className="main-menu-btn btn btn-load icon icon-upload">
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
