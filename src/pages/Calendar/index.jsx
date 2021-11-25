import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CalendarControls from 'components/Calendar/CalendarControls';
import CalendarGrid from 'components/Calendar/CalendarGrid';
import Loader from 'components/ui/Loader';
import { getAppointmentsForMonth } from 'services/appointments';
import showToast from 'util/helpers/showToast';
import { setEvents } from 'store/actions';

const Calendar = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const calendarState = useSelector((state) => state.calendar);
    const eventsState = useSelector((state) => state.events);
    const [state, setState] = useState({ loading: false });

    const updateEventStore = useCallback(
        (data) => {
            const { month, year } = calendarState;
            dispatch(setEvents({ data, month, year }));
        },
        [calendarState, dispatch]
    );

    const handleError = useCallback((err) => {
        let errMessage = 'An unexpected error occured';
        if (err.response) {
            const { data } = err.response;
            errMessage = data.message;
        }

        showToast(errMessage, 'error');
        setState((state) => ({ ...state, loading: false }));
    }, []);

    const getEvents = useCallback(() => {
        const { month, year } = calendarState;
        if (eventsState[`${year}-${month}`]) return;

        setState(state => ({...state, loading: true }));
        getAppointmentsForMonth(month, year, token)
            .then((res) => {
                updateEventStore(res.data.data);
                setState((state) => ({ ...state, loading: false }));
            })
            .catch(handleError);
    }, [calendarState, eventsState, handleError, token, updateEventStore]);

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    if (state.loading) {
        return <Loader />;
    }

    return (
        <>
            <CalendarControls />
            <CalendarGrid />
        </>
    );
};

export default Calendar;
