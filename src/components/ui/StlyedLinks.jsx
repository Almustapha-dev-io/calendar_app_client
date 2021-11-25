import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { PRIMARY, ORANGE } from 'util/styles/colors';

export const StyledLink = styled(Link)`
    color: ${props => props.color ? props.color : PRIMARY};
    font-size: .8rem;
    text-decoration: none;
    transition: all .3s ease;
    
    &:hover {
        text-decoration: underline;
        color: ${ORANGE};
    }
`;

StyledLink.propTypes = {
    color: PropTypes.string
};

export const NavigationLink = styled(NavLink)`
    height: 60%;
    width: 100%;
    margin: 0 auto;
    cursor: default;

    &:not(.active) {
        cursor: pointer;
    }

    .btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        height: 100%;
        padding: 0;
        border-radius: 1.5rem;
        transition: all .35s;

        .btn-icon {
            position: absolute;
            top: 4.5px;
            transition: all 0.1s;

            svg { transition: all .35s; }
        }

        .btn-text {
            position: absolute;
            left: 0.5rem;
            top: 50%;
            transform: translateY(-50%) translateX(1.25rem);
            visibility: hidden;
            opacity: 0;
            font-size: 0.6rem;
            font-weight: 600;
            transition: all 0.35s;
        }
    }

    &.active {
        .btn {
            background: #fff;

            .btn-icon {
                transform: translateX(-1.5rem);
                svg {
                    fill: ${PRIMARY};
                }
            }

            .btn-text {
                visibility: visible;
                opacity: 1;
                transform: translateY(-50%) translateX(1.6rem);
                color: ${PRIMARY};
            }
        }
    }

    &:hover:not(&.active) {
        .btn {
            .btn-icon {
                svg { fill: ${ORANGE}; }
            }
        }
    }

    @media (min-width: 399.99px) and (max-width: 991.98px) {
        .btn {
            .btn-icon { top: 6px; }            
        }    
    }

    @media (min-width: 991.99px) {
        .btn {
            .btn-icon { top: 7px; }
        }
    }
    
    @media (min-width: 339.99px) {
        &.active {
            .btn {
                .btn-text {
                    transform: translateY(-50%) translateX(2.5rem);
                }
            }
        }
    }
`;