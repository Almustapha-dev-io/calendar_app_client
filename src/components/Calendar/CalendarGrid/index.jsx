import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarDayGridItem from './CalendarDayGridItem';

import { CalendarGridContainer } from 'components/ui/Calendar';
import AddEvent from 'components/AddEvent';
import {
    createDaysForCurrentMonth,
    createDaysForNextMonth,
    createDaysForPreviousMonth,
} from 'util/helpers/calendar';
import useMediaQuery from 'hooks/useMediaQuery';

const CalendarGrid = () => {
    const calendarState = useSelector((state) => state.calendar);
    const currentMonthEvents = useSelector((state) => {
        const { month, year } = calendarState;
        return state.events[`${year}-${month}`] ?? [];
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarGridDays, setCalendarGridDays] = useState([]);
    const isBigScreen = useMediaQuery('(min-width: 1000px)');

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
        <>
            <AddEvent
                date={selectedDate}
                close={() => setSelectedDate((_) => null)}
            />
            <CalendarGridContainer>
                {isBigScreen && <CalendarDaysHeader />}
                {calendarGridDays.map((day) => (
                    <CalendarDayGridItem
                        day={day}
                        key={day.dateString}
                        select={() => setSelectedDate((_) => day)}
                    />
                ))}
            </CalendarGridContainer>
        </>
    );
};

export default CalendarGrid;
