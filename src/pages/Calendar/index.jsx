import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import CalendarControls from 'components/Calendar/CalendarControls';
import CalendarGrid from 'components/Calendar/CalendarGrid';
import { getAppointmentsForMonth } from 'services/appointments';
import Loader from 'components/ui/Loader';

const Calendar = () => {
    
    const calendarState = useSelector((state) => state.calendar);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const { month, year } = calendarState;
        getAppointmentsForMonth(month, year, token)
            .then(console.log)
            .catch(console.log);
    }, [calendarState, token]);

    return (
        <>
            <CalendarControls />
            <CalendarGrid />
        </>
    );
};

export default Calendar;
