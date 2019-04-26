import React, { Component } from 'react'
import { Row, Col, Label } from 'reactstrap'
import PropTypes from 'prop-types'
import './style.sass'
import ConductedByNameField from './ConductedByNameField'
import ConductedByRole from './ConductedByRole'

class ConductedBy extends Component {
  handleConductedByFirstNameChange = event => {
    const assessment = { ...this.props.assessment }
    assessment.conducted_by_first_name = event.target.value
    this.props.onAssessmentUpdate(assessment)
  }

  handleConductedByLastNameChange = event => {
    const assessment = { ...this.props.assessment }
    assessment.conducted_by_last_name = event.target.value
    this.props.onAssessmentUpdate(assessment)
  }

  handleConductedByRoleChange = event => {
    const assessment = { ...this.props.assessment }
    assessment.conducted_by_role = event.value
    this.props.onAssessmentUpdate(assessment)
  }

  render() {
    const { assessment, disabled } = this.props
    return (
      <div>
        <Row>
          <Col sm={4}>
            <Label for={'conducted-by-first-name'} className={'assessment-form-header-label'}>
              Assessment Conducted By *
            </Label>
          </Col>
        </Row>
        <Row className={'assessment-form-header-inputs'}>
          <Col sm={4}>
            <ConductedByNameField
              id={'conducted-by-first-name'}
              placeholder={'First Name'}
              value={assessment.conducted_by_first_name}
              onChange={this.handleConductedByFirstNameChange}
              disabled={disabled}
              errorMessage={'First name is too long'}
            />
          </Col>
          <Col sm={4}>
            <ConductedByNameField
              id={'conducted-by-last-name'}
              placeholder={'Last Name'}
              value={assessment.conducted_by_last_name}
              onChange={this.handleConductedByLastNameChange}
              disabled={disabled}
            />
          </Col>
          <Col sm={4}>
            <ConductedByRole
              value={assessment.conducted_by_role}
              onChange={this.handleConductedByRoleChange}
              disabled={disabled}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

ConductedBy.propTypes = {
  assessment: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onAssessmentUpdate: PropTypes.func.isRequired,
}

export default ConductedBy
