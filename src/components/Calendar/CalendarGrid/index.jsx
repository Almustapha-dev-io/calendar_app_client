import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarDayGridItem from './CalendarDayGridItem';

import { CalendarGridContainer } from 'components/ui/Calendar';
import {
    createDaysForCurrentMonth,
    createDaysForNextMonth,
    createDaysForPreviousMonth,
} from 'util/helpers/calendar';
import useMediaQuery from 'hooks/useMediaQuery';

const CalendarGrid = () => {
    const state = useSelector((state) => state.calendar);
    const [calendarGridDays, setCalendarGridDays] = useState([]);
    const isBigScreen = useMediaQuery('(min-width: 1000px)');

    useEffect(() => {
        const currentMonthDays = createDaysForCurrentMonth(
            state.year,
            state.month
        );
        const nextMonthDays = createDaysForNextMonth(
            state.year,
            state.month,
            currentMonthDays
        );
        const previousMonthDays = createDaysForPreviousMonth(
            state.year,
            state.month,
            currentMonthDays
        );
        setCalendarGridDays((_) => [
            ...previousMonthDays,
            ...currentMonthDays,
            ...nextMonthDays,
        ]);
    }, [state]);

    return (
        <CalendarGridContainer>
            {isBigScreen && <CalendarDaysHeader />}
            {calendarGridDays.map((day) => (
                <CalendarDayGridItem day={day} key={day.dateString} />
            ))}
        </CalendarGridContainer>
    );
};

export default CalendarGrid;
