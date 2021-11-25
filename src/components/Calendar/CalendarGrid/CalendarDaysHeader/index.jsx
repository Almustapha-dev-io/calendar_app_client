import React from 'react';

import { CalendarDayHeader } from 'components/ui/Calendar';
import { daysOfWeek } from 'util/helpers/calendar';

const CalendarDaysHeader = () => {
    return (
        <>
            {daysOfWeek.map((day, i) => (
                <CalendarDayHeader
                    key={day}
                    className={[0, 6].includes(i) ? 'weekend' : ''}
                >
                    {day}
                </CalendarDayHeader>
            ))}
        </>
    );
};

export default CalendarDaysHeader;
