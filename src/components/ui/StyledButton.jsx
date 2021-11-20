import styled from 'styled-components';
import { PRIMARY } from 'util/styles/colors';

const ButtonBase = styled.button`
    min-height: 2.8rem;
    min-width: ${props => props.fullWidth ? '100%' : '6.25rem'};
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    font-weight: 600;
    font-size: .9rem;
    letter-spacing: 1px;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: all .3s ease;
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

