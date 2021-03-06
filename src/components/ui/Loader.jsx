import styled, { keyframes } from 'styled-components';
import { CenterInParent } from 'components/ui/PageWrapper';
import { PRIMARY } from 'util/styles/colors';

const load = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`;

const LoaderElement = styled.div`
    &,
    &:after {
        border-radius: 50%;
        width: 6em;
        height: 6em;
    }

    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(33, 33, 33, 0.2);
    border-right: 1.1em solid rgba(33, 33, 33, 0.2);
    border-bottom: 1.1em solid rgba(33, 33, 33, 0.2);
    border-left: 1.1em solid ${PRIMARY};
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: ${load} 1.1s infinite linear;
    animation: ${load} 1.1s infinite linear;
`;

const Loader = () => {
    return (
        <CenterInParent>
            <LoaderElement />
        </CenterInParent>
    );
};

export default Loader; 