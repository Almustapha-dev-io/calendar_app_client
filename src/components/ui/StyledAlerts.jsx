import styled from 'styled-components';
import { DANGER, SUCCESS, WARN } from 'util/styles/colors';

const BaseAlert = styled.div`
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    box-sizing: border-box;
    border-radius: 5px;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 500;
`;

export const AlertSuccess = styled(BaseAlert)`
    color: ${SUCCESS};
    background: rgba(0, 227, 140, 0.2);
    border: 3px solid ${SUCCESS};
`;

export const AlertDanger = styled(BaseAlert)`
    color: ${DANGER};
    background: rgba(255, 0, 0, 0.2);
    border: 3px solid ${DANGER};
`;

export const AlertWarn = styled(BaseAlert)`
    color: ${WARN};
    background-color: ${WARN};
    opacity: 0.3;
    border: 3px solid ${WARN};
`;
