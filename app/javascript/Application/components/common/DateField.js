import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { isEmpty } from '../../util/common'
import { isoToJsDate, isValidLocalDate, jsDateToIso } from '../../util/dateHelper'
import { VALID_ASSESSMENT_DATE_FORMATS } from '../../util/constants'
import './style.sass'

Moment.locale('en')
momentLocalizer()

const dateValue = value => (isEmpty(value) ? null : isoToJsDate(value))

class DateField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: dateValue(this.props.value),
      key: 0,
    }
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    const value = dateValue(nextProps.value)
    return value !== currentState.value ? { value } : null
  }

  handleOnChange = date => {
    if (date === null) {
      this.props.onChange('')
      return
    }
    this.setState({ value: date })
    const isoDate = jsDateToIso(date)
    this.props.onRawValueUpdate({ target: { value: date } })
    this.props.onChange(isoDate)
  }

  handleOnBlur = event => {
    const date = new Date(event.target.value)
    this.props.onRawValueUpdate({ target: { value: date } })
    if (isEmpty(date) || !isValidLocalDate(date)) {
      // recreate <DateTimePicker> to clear raw data in it as a workaround
      if (this.state.value !== date) {
        this.setState({ key: Math.random() })
      }
    }
  }

  render() {
    const {
      id,
      isRequired,
      isValid,
      validationErrorMessage,
      ariaLabelledBy,
      ariaDescribedBy,
      onRawValueUpdate,
    } = this.props
    const { value, key } = this.state
    const className = isValid ? '' : 'rw-state-invalid'
    return (
      <Fragment>
        <DateTimePicker
          id={id}
          key={key}
          value={value}
          date={true}
          time={false}
          parse={VALID_ASSESSMENT_DATE_FORMATS}
          onBlur={this.handleOnBlur}
          onChange={this.handleOnChange}
          onKeyUp={onRawValueUpdate}
          placeholder={'mm/dd/yyyy'}
          required={isRequired}
          aria-required={isRequired}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          disabled={this.props.disabled}
          className={className}
        />
        {!isValid && <div className={'validation-error-line'}>{validationErrorMessage}</div>}
      </Fragment>
    )
  }
}

DateField.defaultProps = {
  disabled: false,
  isRequired: false,
  isValid: true,
  ariaLabelledBy: null,
  ariaDescribedBy: null,
  onRawValueUpdate: () => {},
  validationErrorMessage: 'The value is invalid',
  value: null,
}

DateField.propTypes = {
  ariaDescribedBy: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isValid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onRawValueUpdate: PropTypes.func,
  validationErrorMessage: PropTypes.string,
  value: PropTypes.string,
}

export default DateField
