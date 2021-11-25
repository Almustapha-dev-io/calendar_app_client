import React from 'react';
import PropTypes from 'prop-types';

import { NavigationLink } from 'components/ui/StlyedLinks';

const NavigationItem = (props) => {
    return (
        <NavigationLink exact to={props.link}>
            <span className="btn">
                <span className="btn-icon">{props.icon}</span>
                <span className="btn-text">{props.text}</span>
            </span>
        </NavigationLink>
    );
};

NavigationItem.propTypes = {
    link: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
};

export default NavigationItem;
