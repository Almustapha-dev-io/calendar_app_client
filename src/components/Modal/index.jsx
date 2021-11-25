import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Spinner from 'components/ui/Spinner';
import { ModalContainer } from 'components/ui/Modal';
import {
    PrimaryButton,
    SecondaryButton,
} from 'components/ui/StyledButton';
import { PRIMARY } from 'util/styles/colors';

const Modal = (props) => {
    const proceedText = props.proceedText ? props.proceedText : 'Continue';
    const closeText = props.closeButtonText ? props.closeButtonText : 'Close';

    let proceedButton = null;
    if (props.onProceed) {
        proceedButton = (
            <PrimaryButton
                style={{ marginLeft: '10px' }}
                disabled={props.proceedButtonDisabled ? true : false}
                onClick={props.onProceed}
            >
                {props.buttonLoader ? <Spinner /> : proceedText}
            </PrimaryButton>
        );
    }

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <ModalContainer>
                <div className="content" style={props.styleX}>
                    <div className="header">
                        <h4 className="title">{props.title}</h4>
                    </div>

                    {props.children && (
                        <div className="body">{props.children}</div>
                    )}

                    <div className="actions">
                        <SecondaryButton 
                            disabled={props.closeButtonDisabled ? true : false}
                            onClick={props.onClose}
                        >
                            {closeText}
                        </SecondaryButton>
                        {proceedButton}
                    </div>
                </div>
            </ModalContainer>
        </CSSTransition>,
        document.getElementById('root')
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onProceed: PropTypes.func,
    closeButtonText: PropTypes.string,
    proceedText: PropTypes.string,
    styleX: PropTypes.object,
    proceedButtonDisabled: PropTypes.bool,
    closeButtonDisabled: PropTypes.bool,
    buttonLoader: PropTypes.bool
};

export default Modal;
