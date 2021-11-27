import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Arrow from 'components/svg/Arrow';
import DropdownInput from 'components/DropdownInput';
import {
    CalendarControlsContainer,
    CalendarControlButton,
} from 'components/ui/Calendar';
import {
    getMonthDropdownOptions,
    getYearDropdownOptions,
} from 'util/helpers/calendar';

import {
    setYear as setYearAction,
    setMonth as setMonthAction,
    nextOrPrevious,
} from 'store/actions/calendar';

const CalendarControls = () => {
    const dispatch = useDispatch();
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);

    const state = useSelector((state) => state.calendar);
    const setYear = useCallback(
        (year) => dispatch(setYearAction(year)),
        [dispatch]
    );

    const setMonth = useCallback(
        (month) => dispatch(setMonthAction(month)),
        [dispatch]
    );

    useEffect(() => {
        setMonths((_) =>
            getMonthDropdownOptions().map((opt) => ({
                value: opt.value,
                display: opt.label,
            }))
        );

        setYears((_) =>
            getYearDropdownOptions(state.year).map((opt) => ({
                value: opt.value,
                display: opt.label,
            }))
        );
    }, [state.year]);

    const prevHandler = () => {
        let year = state.year;
        let month = state.month - 1;
        if (month === 0) {
            month = 12;
            year = state.year - 1;
        }

        dispatch(nextOrPrevious({ month, year }));
    };

    const nextHandler = () => {
        let year = state.year;
        let month = state.month + 1;
        if (month === 13) {
            month = 1;
            year = state.year + 1;
        }

        dispatch(nextOrPrevious({ month, year }));
    };

    return (
        <CalendarControlsContainer>
            <CalendarControlButton
                onClick={prevHandler}
                style={{ marginRight: '.5rem' }}
            >
                <Arrow direction="left" />
            </CalendarControlButton>

            <DropdownInput
                styleX={{
                    marginRight: '10px',
                    width: '60%',
                }}
                setValue={setMonth}
                placeholder="Month"
                items={months}
                initialValue={state.month}
                blockInput
            />

            <DropdownInput
                styleX={{
                    width: '40%',
                }}
                setValue={setYear}
                placeholder="Year"
                items={years}
                initialValue={state.year}
                blockInput
            />

            <CalendarControlButton
                onClick={nextHandler}
                style={{ marginLeft: '.5rem' }}
            >
                <Arrow direction="right" />
            </CalendarControlButton>
        </CalendarControlsContainer>
    );
};

export default React.memo(CalendarControls);
