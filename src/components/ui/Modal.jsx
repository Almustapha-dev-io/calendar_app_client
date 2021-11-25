import styled from 'styled-components';
import { PRIMARY } from 'util/styles/colors';

export const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .8);
    opacity: 0;
    z-index: 999;
    pointer-events: none;
    overflow: auto;
    padding: 2rem 0;
    box-sizing: border-box;
    transition: all .2s ease;

    .content {
        width: 500px;
        max-width: 90%;
        background-color: #fff;
        border-radius: .3125rem;
        transform: scale(.5) translateY(30px);
        transform-origin: 0% 0%;
        box-sizing: border-box;
        margin: 2rem auto;
        transition: all .2s ease;

        * { box-sizing: border-box; }

        .header, .actions { padding: 1rem; }

        .header {
            .title {
                margin: 0;
                color: ${PRIMARY};
            }
        }

        .actions {
            display: flex;
            justify-content: center;
        }

        .body {
            padding: .2rem 1.5rem;
            transition: all 1s ease;
        }
    }

    &.enter-done {
        opacity: 1;
        pointer-events: visible;

        .content {
            transform: scale(1) translateY(0);
        }
    }

    &.exit {
        opacity: 0;

        .content {
            transform: scale(1) translateY(0);
            transform: scale(.5) translateY(30px);
            transform-origin: 0% 0%;
        }
    }

    @media (min-width: 500px) {
        .content {
            width: 500px;

            .actions {
                justify-content: flex-end;
            }
        }      
    }
`;