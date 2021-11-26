import React, { useContext } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import {
    CalendarGridItem,
    CalendayGridItemHeader,
    CalendarGridItemContent,
} from 'components/ui/Calendar';
import AddSvg from 'components/svg/AddSvg';

import { getDayDo, getDayString } from 'util/helpers/calendar';
import useMediaQuery from 'hooks/useMediaQuery';
import { EventContext } from 'context/event-context';

const today = dayjs().format('YYYY-MM-DD');

const CalendarDayGridItem = ({ day }) => {
    const isBigScreen = useMediaQuery('(min-width: 1000px)');
    const { setEvent, setDate } = useContext(EventContext);

    const gridItemClasses = [];
    if (!day.isCurrentMonth) {
        gridItemClasses.push('not-current');
    }

    if (day.dateString === today) {
        gridItemClasses.push('today');
    }

    let headerText = [day.dayOfMonth];
    if (!isBigScreen) {
        headerText = [getDayString(day.dateString), getDayDo(day.dateString)];
    }

    let addButton = null;
    if (dayjs(day.dateString).valueOf() > Date.now() && day.isCurrentMonth) {
        addButton = <AddSvg clicked={() => setDate(day)} />;
    }
    return (
        <>
            <CalendarGridItem className={gridItemClasses.join(' ')}>
                <CalendayGridItemHeader>
                    {headerText.join(' ')}
                    {addButton}
                </CalendayGridItemHeader>

                <CalendarGridItemContent>
                    {day.events && day.events.slice(0, 3).map((event) => (
                        <div
                            key={event._id}
                            className={`item ${gridItemClasses.join(' ')}`}
                            onClick={() => setEvent(event)}
                        >
                            {event.title}
                        </div>
                    ))}
                </CalendarGridItemContent>
            </CalendarGridItem>
        </>
    );
};

CalendarDayGridItem.propTypes = {
    day: PropTypes.object.isRequired,
};

export default CalendarDayGridItem;
