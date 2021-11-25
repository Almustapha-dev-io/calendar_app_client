import styled from 'styled-components';
import { PRIMARY } from 'util/styles/colors';


export const NavigationWrapper = styled.div`
    width: 100%;
    height: 100px;
    margin: 0;
    z-index: 500;
    background: transparent;

    padding: 1rem .5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NavigationContainer = styled.div`
    margin: 0;
    padding: 0 1rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    background: ${PRIMARY};
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 349.99px) {
        width: 350px;
    }
`;