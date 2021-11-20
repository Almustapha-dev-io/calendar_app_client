import styled from 'styled-components';
import { PRIMARY, SECONDARY, DANGER } from 'util/styles/colors';

export const Input = styled.input`
    min-height: 2.8rem;
    width: ${props => props.width ? props.width : '100%'};
    margin: ${props => props.margin ? props.margin : '0'};
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid ${PRIMARY};
    outline: none;
    font-family: inherit;
    font-weight: 500;
    color: ${PRIMARY};
    transition: outline .3s ease;

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

export const FormGroup = styled.div`
    &:not(:last-of-type) {
        margin: 0 0 10px;
    }

    label {
        display: block;
        font-family: inherit;
        font-size: .8rem;
        font-weight: 500;
        color: ${PRIMARY};
    }

    label.invalid { color: ${DANGER}; }

    .error {
        font-size: .7rem;
        line-height: .7rem;
        font-family: inherit;
        font-weight: 500;
        color: ${DANGER};
        display: block;
        margin: 1px 0;
    }
`;