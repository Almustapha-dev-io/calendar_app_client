import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { SliderContainer } from 'components/ui/SidePanel';
import CloseSvg from 'components/svg/CloseSvg';

const SidePanel = (props) => {
    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <SliderContainer
                onClick={props.close}
            >
                <div className="content">
                    <div className="header">
                        <h4 className="title">{props.title}</h4>
                        <CloseSvg clicked={props.close} />
                    </div>

                    {props.children && (
                        <div className="body">{props.children}</div>
                    )}
                </div>
            </SliderContainer>
        </CSSTransition>,
        document.getElementById('root')
    )
};

SidePanel.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
};

export default SidePanel;
