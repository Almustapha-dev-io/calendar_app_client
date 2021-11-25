import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    100% { transform: rotate(360deg) }
`;

const dash = keyframes`
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
`;

const Svg = styled.svg`
    width: 30px;
    height: 30px;
    animation: ${rotate} 2s linear infinite;

    circle {
        fill: none;
        stroke-width: 5px;
        stroke-linecap: round;
        animation: ${dash} 1.7s ease-in-out infinite;
    }
`;

const Spinner = (props) => {
    const { strokeColor } = props;
    const stroke = strokeColor ? strokeColor : '#fff';

    return (
        <Svg viewBox="0 0 50 50">
            <circle stroke={stroke} cx="25" cy="25" r="20"></circle>
        </Svg>
    );
};

Spinner.propTypes = {
    strokeColor: PropTypes.string,
};

export default Spinner;
