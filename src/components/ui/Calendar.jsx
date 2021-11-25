import styled from 'styled-components';
import { GRAY, PRIMARY, SECONDARY, SUCCESS } from 'util/styles/colors';

export const CalendarControlsContainer = styled.div`
    width: 500px;
    max-width: 100%;
    height: 100px;
    padding: 0;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CalendarControlButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: .3rem;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    transition: all 0.35s;

    svg { fill: ${PRIMARY}; 

    &:hover { background: ${GRAY}; }
`;

export const CalendarAddButton = styled.button`
    width: 40px;
    height 40px;
    border-radius: 50%;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: ${PRIMARY};
    transition: all .3s ease;

    svg { fill: ${PRIMARY}; }

    &:hover {
        background: ${PRIMARY};
        color: #fff;
        svg { fill: #fff; }
    }
`;

export const CalendarGridContainer = styled.div`
    width: 100%;
    height: 80%;
    margin: 1rem auto 0;
    padding: 0 0 1rem;
    box-sizing: border-box;

    display: grid;
    grid-gap: 0.8rem;

    @media (min-width: 1000px) {
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 0rem;
        margin: auto;
    }

    @media (min-width: 600px) and (max-width: 991px) {
        max-width: 85%;
    }

    @media (min-width: 991.99px) and (max-width: 1440px) {
        max-width: 900px;
    }

    @media (min-width: 1439.99px) {
        max-width: 1248px;
    }
`;

export const CalendarGridItem = styled.div`
    width: 100%;
    min-height: 100px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 2px solid #f5f5f5;
    border-radius: 5px;
    transition: all 0.3s;
    font-size: 0.75rem;
    font-weight: 500;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &.not-current {
        background: #f5f5f5;
        color: #a1a1a1;
        border: none;
    }

    &.today {
        color: #fff;
        background: ${PRIMARY};
        border-color: #fff;
        border-radius: 6px;
    }

    &:hover {
        div {
            svg {
                visibility: visible;
            }
        }
    }
    &:hover:not(&.today) {
        border: 2px solid ${PRIMARY};
        border-radius: 6px;
    }

    @media (min-width: 1000px) {
        height: 150px;
        min-height: 150px;
        border-radius: 0;
    }


`;

export const CalendayGridItemHeader = styled.div`
    width: 100%;
    margin: 0;
    padding: .6rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-weight: 500;

    svg {  
        cursor: pointer;
        fill: ${SECONDARY};
        transition: all .2s;
    }

    svg:hover {
        fill: ${SUCCESS};
    }

    @media (min-width: 1000px) {
        padding: .3rem;
        font-size: 1rem;
        svg {
            visibility: hidden;
        }
    }
`;

export const CalendarGridItemContent = styled.div`
    width: 100%;
    // height: 100%;
    margin: 0;
    padding: .2rem 1rem;
    box-sizing: border-box;
    
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    transition: all .2s;

    .item {
        max-height: 1.5rem;
        font-size: .8rem;
        font-weight: 500;
        padding: 0.1rem .3rem;
        box-sizing: border-box;
        border-radius: 3px;
        
        border: none;
        color: #fff;
        background: ${SUCCESS};

        cursor: pointer;
        transition: all .2s;
    }
    
    .item.today {
        color: ${PRIMARY};
        background: #fff;
    }

    .item.not-current {
        color: #a1a1a1;
        border-color: #a1a1a1;
    }

    .item:hover {
        border: 2px solid ${PRIMARY};
    }

    @media (min-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
        grid-gap: .5rem;
        padding: .2rem .5rem;
    }
`;

export const CalendarDayHeader = styled.div`
    width: 100%;
    height: 100%;
    color: ${PRIMARY};
    margin: 0;
    padding: 0.5rem;
    box-sizing: border-box;

    font-size: 0.9rem;
    font-weight: 600;
    line-height: 0.9rem;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    transition: all 0.2s;

    &.weekend {
        color: #a1a1a1;
    }
`;

