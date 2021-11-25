import React, { useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import {
    CalendarGridItem,
    CalendayGridItemHeader,
    CalendarGridItemContent,
} from 'components/ui/Calendar';
import AddSvg from 'components/svg/AddSvg';
import AddEvent from 'components/AddEvent';

import { getDayDo, getDayString } from 'util/helpers/calendar';
import useMediaQuery from 'hooks/useMediaQuery';

const today = dayjs().format('YYYY-MM-DD');

const CalendarDayGridItem = ({ day }) => {
    const isBigScreen = useMediaQuery('(min-width: 1000px)');
    const [selectedDate, setSelectedDate] = useState(null);

    const gridItemClasses = [];
    if (!day.isCurrentMonth) {
        gridItemClasses.push('not-current');
    }

    if (day.dateString === today) {
        gridItemClasses.push('today');
    }

    let headerText = [day.dayOfMonth];
    if (!isBigScreen) {
        headerText = [
            getDayString(day.dateString),
            getDayDo(day.dateString)
        ];
    }

    return (
        <>
            <AddEvent
                date={selectedDate}
                close={() => setSelectedDate((_) => null)}
            />
            <CalendarGridItem className={gridItemClasses.join(' ')}>
                <CalendayGridItemHeader>
                    {headerText.join(' ')}
                    {dayjs(day.dateString).valueOf() > Date.now() && (
                        <AddSvg clicked={() => setSelectedDate((_) => day)} />
                    )}
                </CalendayGridItemHeader>

                <CalendarGridItemContent>
                    {/* <div className={`item ${gridItemClasses.join(' ')}`}>
                        help me
                    </div> */}
                </CalendarGridItemContent>
            </CalendarGridItem>
        </>
    );
};

CalendarDayGridItem.propTypes = {
    day: PropTypes.object.isRequired,
};

export default CalendarDayGridItem;
