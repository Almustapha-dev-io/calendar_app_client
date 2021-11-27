import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PRIMARY, SECONDARY, DANGER, GRAY } from 'util/styles/colors';

export const Input = styled.input`
    min-height: 2.8rem;
    width: ${(props) => (props.width ? props.width : '100%')};
    margin: ${(props) => (props.margin ? props.margin : '0')};
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid ${PRIMARY};
    outline: none;
    font-family: inherit;
    font-weight: 500;
    color: ${PRIMARY};
    transition: outline 0.3s ease;
    resize: none;

    &:focus {
        outline: 3px solid ${PRIMARY};
        border: none;
    }

    &:disabled {
        color: ${SECONDARY};
        background: #dedede;
        border: none;
        cursor: not-allowed;
    }

    &.invalid {
        color: ${DANGER};
        border-color: ${DANGER};
        outline-color: ${DANGER};
    }
`;

Input.propTypes = {
    width: PropTypes.string,
    margin: PropTypes.string,
};

export const FormGroup = styled.div`
    &:not(:last-of-type) {
        margin: 0 0 10px;
    }

    label {
        display: block;
        font-family: inherit;
        font-size: 0.8rem;
        font-weight: 500;
        color: ${PRIMARY};
    }

    label.invalid {
        color: ${DANGER};
    }

    .error {
        font-size: 0.7rem;
        line-height: 0.7rem;
        font-family: inherit;
        font-weight: 500;
        color: ${DANGER};
        display: block;
        margin: 2px 0;
    }
`;

export const InputDropdownContainer = styled.div`
    margin: 0;
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 500;
`;

export const InputDropdownItems = styled.div`
    width: 100%;
    max-height: 300px;
    overflow: auto;
    display: block;
    position: absolute;
    top: 3rem;
    left: 0;
    padding: 0;
    margin: 0;
    background: #fff;
    
    border-radius: 6px;
    border: 2px solid ${PRIMARY};
    z-index: 500;

    @media (min-width: 767.99px) } {
        top: 3.5rem;
    }
`;

export const InputDropdownItem = styled.span`
    display: block;
    width: 100%;
    margin: 0;
    padding: 0.8rem;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    overflow: hidden;
    transition: all .2s;
    z-index: 500;

    &.selected {
        color: #fff;
        background: ${PRIMARY};
    }

    &:hover:not(&.selected) {
        background: ${GRAY};
    }

    &:first-of-type {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    &:last-of-type {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
`;

export const DetailRow = styled.div`
width: 100%;
margin: 0 0 1rem;

label {
    display: block;
    color: #a1a1a1;
    font-size: 0.8rem;
    margin: 0;
}

p {
    margin: 0;
}
`;