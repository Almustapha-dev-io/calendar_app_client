import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { PRIMARY, ORANGE } from 'util/styles/colors';

export const StyledNavLink = styled(NavLink)`
    color: ${props => props.color ? props.color : PRIMARY};
    font-size: .8rem;
    text-decoration: none;
    transition: all .3s ease;
    
    &:hover {
        text-decoration: underline;
        color: ${ORANGE};
    }
`;