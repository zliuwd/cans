import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import PropTypes from 'prop-types';
import React from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { isEmpty } from '../../util/common';
import { isoToJsDate, isValidIsoDate, jsDateToIso } from '../../util/dateHelper';
import { LOCAL_DATE_FORMAT } from '../../util/constants';

Moment.locale('en');
momentLocalizer();

const proxyOnChange = onChange => date => {
  if (date === null) {
    onChange(null);
    return;
  }
  const dateProcessed = jsDateToIso(date);
  onChange(dateProcessed);
};

const proxyOnBlur = onBlur => event => {
  if (!onBlur) {
    return;
  }
  const date = event.target.value;
  if (isEmpty(date) || !isValidIsoDate(date)) {
    onBlur(null);
    return;
  }
  onBlur(date);
};

const DateField = ({ id, max, min, onBlur, onChange, isRequired, value }) => {
  const dateValue = isEmpty(value) ? null : isoToJsDate(value);
  const placeholder = 'mm/dd/yyyy';

  return (
    <DateTimePicker
      aria-required={isRequired}
      date={true}
      value={dateValue}
      format={LOCAL_DATE_FORMAT}
      id={id}
      onBlur={proxyOnBlur(onBlur)}
      onChange={proxyOnChange(onChange)}
      placeholder={placeholder}
      required={isRequired}
      time={false}
      max={max}
      min={min}
    />
  );
};

DateField.defaultProps = {
  isRequired: false,
  max: null,
  min: isoToJsDate('1900-01-01'),
  onBlur: null,
};

DateField.propTypes = {
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default DateField;
