import styled from 'styled-components';
import { PRIMARY } from 'util/styles/colors';

const PageWrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
`;

export const AuthWrapper = styled(PageWrapper)`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const AuthContent = styled.div`
    width: 400px;
    max-width: 100%;
    margin: 10% 0;
    padding: 2rem;
    box-sizing: border-box;
    
    p { 
        font-size: .8rem;
        line-height: .8rem;
        margin: 0 0 10px;
    }

    h2 { text-align: center; }
    p, h2 { color: ${PRIMARY}; }

    @media (min-width: 991.99px) {
        margin-top: 5%;
    }
`;

export const CenteredWrapper = styled(PageWrapper)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

