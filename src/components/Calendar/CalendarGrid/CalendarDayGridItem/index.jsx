import React from 'react';
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

const today = dayjs().format('YYYY-MM-DD');

const CalendarDayGridItem = ({ day, select }) => {
    const isBigScreen = useMediaQuery('(min-width: 1000px)');

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
        addButton = <AddSvg clicked={select} />;
    }
    return (
        <>
            <CalendarGridItem className={gridItemClasses.join(' ')}>
                <CalendayGridItemHeader>
                    {headerText.join(' ')}
                    {addButton}
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
    select: PropTypes.func.isRequired,
};

export default CalendarDayGridItem;
