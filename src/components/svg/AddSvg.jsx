import React from 'react';
import PropTypes from 'prop-types';

const AddSvg = (props) => {
    return (
        <svg
            onClick={() => (props.clicked ? props.clicked() : '')}
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#000000"
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
    );
};

AddSvg.propTypes = {
    clicked: PropTypes.func,
};

export default AddSvg;
