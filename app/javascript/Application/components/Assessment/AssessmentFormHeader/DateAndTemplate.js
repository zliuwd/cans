import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Label } from 'reactstrap'
import AgeRangeSwitch from '../../common/AgeRangeSwitch'
import DateField from '../../common/DateField'

class DateAndTemplate extends React.PureComponent {
  renderTopLabels() {
    return (
      <Row>
        <Col sm={2}>
          <Label
            required
            id="assessment-date-label"
            className="assessment-form-header-label"
            htmlFor="assessment-date_input"
          >
            Assessment Date *
          </Label>
        </Col>
        <Col sm={3}>
          <span id="assessment-template-label" className="assessment-form-header-label">
            Select CANS Template *
          </span>
        </Col>
      </Row>
    )
  }

  renderDateSelect() {
    const { eventDate, onEventDateChange, onEventDateFieldKeyUp, disabled, isEventDateBeforeDob } = this.props
    return (
      <DateField
        required={true}
        id={'assessment-date'}
        value={eventDate}
        onChange={onEventDateChange}
        onRawValueUpdate={onEventDateFieldKeyUp}
        ariaLabelledBy={'assessment-date-label'}
        disabled={disabled}
        isValid={!isEventDateBeforeDob}
        validationErrorMessage={'Enter an assessment date that is on or after the client’s date of birth.'}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTopLabels()}
        <Row className={'assessment-form-header-inputs'}>
          <Col sm={2}>{this.renderDateSelect()}</Col>
          <Col xs={3}>
            <AgeRangeSwitch
              isUnderSix={this.props.isUnderSix}
              onChange={this.props.onAgeTemplateChange}
              disabled={this.props.disabled}
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

DateAndTemplate.propTypes = {
  disabled: PropTypes.bool.isRequired,
  eventDate: PropTypes.string.isRequired,
  isEventDateBeforeDob: PropTypes.bool.isRequired,
  isUnderSix: PropTypes.bool,
  onAgeTemplateChange: PropTypes.func.isRequired,
  onEventDateChange: PropTypes.func.isRequired,
  onEventDateFieldKeyUp: PropTypes.func.isRequired,
}

DateAndTemplate.defaultProps = {
  isUnderSix: undefined,
}

export default DateAndTemplate
