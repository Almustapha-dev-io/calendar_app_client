import styled from 'styled-components';
import { PRIMARY, DANGER } from 'util/styles/colors';

export const SliderContainer = styled.div`
    position: fixed;
    height: 100vh;
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
        height: 100vh;
        background-color: #fff;
        margin: 0;
        padding: 0;
        transition: all .2s ease;
        position: relative;

        .header {
            margin: 0;
            padding: 1rem;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
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
            // height: 100%;
            margin: 0;
            padding: 1rem;
            box-sizing: border-box;
            overflow: auto;
        }

        .actions {
            width: 100%;
            height: 100px;
            margin: auto 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }

    &.enter-done {
        opacity: 1;
        pointer-events: visible;
        .content { width: 100vw; }
    }

    &.exit {
        opacity: 0;
        .content { width: 0px; }
    }

    @media (min-width: 700px) {
        &.enter-done {
            .content { width: 450px; }
        }
    }
`;