import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PRIMARY, DANGER } from 'util/styles/colors';

const ButtonBase = styled.button`
    min-height: 2.8rem;
    min-width: ${(props) => (props.fullWidth ? '100%' : '6.25rem')};
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 1px;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;
    outline-offset: 1px;

    resize: none;

    &:hover:not(:disabled) {
        border-radius: 20px;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

ButtonBase.propTypes = {
    fullWidth: PropTypes.bool,
};

export const PrimaryButton = styled(ButtonBase)`
    background: ${PRIMARY};
    color: #fff;

    &:focus {
        outline: 3px solid ${PRIMARY};
    }

    &:disabled {
        background: #353535;
    }
`;

export const SecondaryButton = styled(ButtonBase)`
    background: #fff;
    color: ${PRIMARY};
    border: 3px solid ${PRIMARY};

    &:focus {
        outline: 3px solid ${PRIMARY};
    }
`;

export const DangerButton = styled(ButtonBase)`
    background: ${DANGER};
    color: #fff;
    border: none;

    &:focus {
        outline: 3px solid ${DANGER};
    }
`;