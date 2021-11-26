import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarDayGridItem from './CalendarDayGridItem';

import { CalendarGridContainer } from 'components/ui/Calendar';
import AddEvent from 'components/Event/AddEvent';
import ViewEvent from 'components/Event/ViewEvent';

import {
    createDaysForCurrentMonth,
    createDaysForNextMonth,
    createDaysForPreviousMonth,
} from 'util/helpers/calendar';
import useMediaQuery from 'hooks/useMediaQuery';
import EventContextProvider from 'context/event-context';

const CalendarGrid = () => {
    const [calendarGridDays, setCalendarGridDays] = useState([]);

    const isBigScreen = useMediaQuery('(min-width: 1000px)');
    const calendarState = useSelector((state) => state.calendar);
    const currentMonthEvents = useSelector((state) => {
        const { month, year } = calendarState;
        return state.events[`${year}-${month}`] ?? [];
    });

    useEffect(() => {
        const currentMonthDays = createDaysForCurrentMonth(
            calendarState.year,
            calendarState.month
        );
        const nextMonthDays = createDaysForNextMonth(
            calendarState.year,
            calendarState.month,
            currentMonthDays
        );
        const previousMonthDays = createDaysForPreviousMonth(
            calendarState.year,
            calendarState.month,
            currentMonthDays
        );

        const gridDays = [
            ...previousMonthDays,
            ...currentMonthDays,
            ...nextMonthDays,
        ];

        currentMonthEvents.forEach((event) => {
            const formattedDate = dayjs(event.appointmentDate).format(
                'YYYY-MM-DD'
            );

            const gridDay = gridDays.find(
                (day) => day.dateString === formattedDate
            );

            if (gridDay) {
                gridDay.events.push(event);
            }
        });

        setCalendarGridDays((_) => gridDays);
    }, [calendarState.year, calendarState.month, currentMonthEvents]);

    return (
        <EventContextProvider>
            <AddEvent />
            <ViewEvent />

            <CalendarGridContainer>
                {isBigScreen && <CalendarDaysHeader />}

                {calendarGridDays.map((day) => (
                    <CalendarDayGridItem
                        day={day}
                        key={day.dateString}
                    />
                ))}
            </CalendarGridContainer>
        </EventContextProvider>
    );
};

export default CalendarGrid;
