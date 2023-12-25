'use client'

import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalenderProps {
    value: Range;
    onChange: (value: Range) => void;
    disabledDates?: Date[]
}

const Calendar: React.FC<CalenderProps> = ({ onChange, disabledDates, value }) => {
    return (
        <DateRange rangeColors={['#262626']} ranges={[value]} date={new Date()} onChange={onChange} direction="vertical" showDateDisplay={false} minDate={new Date()} disabledDates={disabledDates} />

    )
}

export default Calendar