import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

const Alert = (props) => {
    return (
        <Modal
            styleX={{ width: '400px'}}
            title={props.title}
            show={props.show}
            closeButtonText={props.closeText ? props.closeText : 'Cancel'}
            onClose={props.onClose}
            onProceed={props.onConfirm}
            proceedText={props.confirmText ? props.confirmText : 'Continue'}    
        >
            {props.children}
        </Modal>
    );
};

Alert.propTypes = {
    show: PropTypes.bool,
    onConfirm: PropTypes.func,
    confirmText: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    closeText: PropTypes.string,
    title: PropTypes.string.isRequired
};

export default Alert;
