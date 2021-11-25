import styled from 'styled-components';
import { PRIMARY, DANGER } from 'util/styles/colors';

export const SliderContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .8);
    opacity: 0;
    z-index: 999;
    pointer-events: none;
    overflow: hidden;
    padding: 0;
    box-sizing: border-box;
    transition: all .2s ease;

    .content {
        width: 0px;
        height: 100%;
        background-color: #fff;
        margin: 0;
        transition: all .2s ease;
        
        * { box-sizing: border-box; }

        .header {
            margin: 0;
            padding: 1rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                margin: 0;
                color: ${PRIMARY};
            }

            svg { fill: ${PRIMARY}; }

            svg:hover { fill: ${DANGER}; }
        }

        .body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 1rem;
        }
    }

    &.enter-done {
        opacity: 1;
        pointer-events: visible;
        .content { width: 100%; }
    }

    &.exit {
        opacity: 0;
        .content { width: 0px; }
    }

    @media (min-width: 700px) {
        &.enter-done {
            .content { width: 500px; }
        }
    }
`;