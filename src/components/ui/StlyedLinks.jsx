import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
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