import { range } from 'ramda';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

export const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const getDayString = dateString => dayjs(dateString).format('dddd');
export const getDayDo = dateString => dayjs(dateString).format('Do');
export const getWeekday = dateString => dayjs(dateString).weekday();
export const isWeekendDay = dateString => [6, 0].includes(getWeekday(dateString));

export const getYearDropdownOptions = currentYear => {
    const minYear = currentYear - 4;
    const maxYear = currentYear + 5;

    return range(minYear, maxYear + 1).map(year => ({
        label: String(year),
        value: year
    }));
};

export const getMonthDropdownOptions = () => {
    return range(1, 13).map(month => ({
        label: dayjs().month(month-1).format('MMMM'),
        value: month
    }));
};

export const getNumberOfDaysInMonth = (year, month) => {
    return dayjs(`${year}-${month}-01`).daysInMonth();
};

export const createDaysForCurrentMonth = (year, month) => {
    return [...Array(getNumberOfDaysInMonth(year, month))]
        .map((_, index) => {
            return {
                dateString: dayjs(`${year}-${month}-${index + 1}`).format('YYYY-MM-DD'),
                dayOfMonth: index + 1,
                isCurrentMonth: true
            };
        });
};

export const createDaysForPreviousMonth = (year, month, currentMonthDays) => {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString);
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');

    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

    const previousMonthLastMondayDayOfMonth = dayjs(
        currentMonthDays[0].dateString
    )
        .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
        .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)]
        .map((_, index) => {
            return {
                dateString: dayjs(
                    `${previousMonth.year()}-${previousMonth.month() + 1}-${
                        previousMonthLastMondayDayOfMonth + index
                    }`
                ).format('YYYY-MM-DD'),
                dayOfMonth: previousMonthLastMondayDayOfMonth + index,
                isCurrentMonth: false,
                isPreviousMonth: true
            };
        });
    
};

export const createDaysForNextMonth = (year, month, currentMonthDays) => {
    const lastDayOfTheMonthWeekday = getWeekday(
        `${year}-${month}-${currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, 'month');
    const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
            dateString: dayjs(
                `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
            ).format('YYYY-MM-DD'),
            dayOfMonth: index + 1,
            isCurrentMonth: false,
            isNextMonth: true
        };
    });
};