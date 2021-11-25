import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarDayGridItem from './CalendarDayGridItem';

import { CalendarGridContainer } from 'components/ui/Calendar';
import AddEvent from 'components/AddEvent';
import SidePanel from 'components/SidePanel';

import {
    createDaysForCurrentMonth,
    createDaysForNextMonth,
    createDaysForPreviousMonth,
} from 'util/helpers/calendar';
import useMediaQuery from 'hooks/useMediaQuery';

const CalendarGrid = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarGridDays, setCalendarGridDays] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
        <>
            <AddEvent
                date={selectedDate}
                close={() => setSelectedDate((_) => null)}
            />

            <SidePanel
                close={() => setSelectedEvent((_) => null)}
                title="Test"
                show={selectedEvent ? true : false}
            >
                <pre>{JSON.stringify(selectedEvent, null, 2)}</pre>
            </SidePanel>

            <CalendarGridContainer>
                {isBigScreen && <CalendarDaysHeader />}
                {calendarGridDays.map((day) => (
                    <CalendarDayGridItem
                        day={day}
                        key={day.dateString}
                        onAdd={() => setSelectedDate((_) => day)}
                        eventClicked={(event) => setSelectedEvent((_) => event)}
                    />
                ))}
            </CalendarGridContainer>
        </>
    );
};

export default CalendarGrid;