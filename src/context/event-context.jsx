import React, { useCallback, useState } from 'react';

export const EventContext = React.createContext({
    event: null,
    date: null,
    setEvent: () => {},
    setDate: () => {},
    setEventAndDate: () => {},
});

const EventContextProvider = (props) => {
    const [state, setState] = useState({});

    const setEventHandler = useCallback((event) => {
        setState((state) => ({ ...state, event }));
    }, []);

    const setDateHandler = useCallback((date) => {
        setState((state) => ({ ...state, date }));
    }, []);

    const setDateAndEventHandler = useCallback(({ date, event }) => {
        setState((state) => ({ ...state, date, event }));
    }, []);

    return (
        <EventContext.Provider
            value={{
                event: state.event,
                date: state.date,
                setDate: setDateHandler,
                setEvent: setEventHandler,
                setEventAndDate: setDateAndEventHandler
            }}
        >
            {props.children}
        </EventContext.Provider>
    );
};

export default EventContextProvider;
