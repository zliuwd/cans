import React, { PureComponent } from 'react'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import './style.sass'
import ConductedByNameField from './ConductedByNameField'
import ConductedByRole from './ConductedByRole'

class ConductedBy extends PureComponent {
  render() {
    const { firstName, lastName, role, onChange, disabled } = this.props
    return (
      <form>
        <fieldset>
          <legend className={'assessment-form-header-legend'}>Assessment Conducted By</legend>
          <Row className={'assessment-form-header-inputs'}>
            <Col sm={4}>
              <ConductedByNameField
                id={'conducted-by-first-name'}
                label={'First Name *'}
                value={firstName}
                onChange={onChange}
                disabled={disabled}
                errorMessage={'First name is too long'}
                fieldName={'conducted_by_first_name'}
              />
            </Col>
            <Col sm={4}>
              <ConductedByNameField
                id={'conducted-by-last-name'}
                label={'Last Name *'}
                value={lastName}
                onChange={onChange}
                disabled={disabled}
                fieldName={'conducted_by_last_name'}
              />
            </Col>
            <Col sm={4}>
              <ConductedByRole value={role} onChange={onChange} disabled={disabled} />
            </Col>
          </Row>
        </fieldset>
      </form>
    )
  }
}

ConductedBy.defaultProps = {
  firstName: undefined,
  lastName: undefined,
  role: undefined,
}

ConductedBy.propTypes = {
  disabled: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  role: PropTypes.string,
}

export default ConductedBy
