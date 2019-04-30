import React from 'react'
import { Input, Label } from 'reactstrap'
import PropTypes from 'prop-types'
import { Icon } from '@cwds/components'
import { ConductedByNameMaxLength } from '../AssessmentHelper'

const ConductedByNameField = ({ id, value, onChange, disabled, label, errorMessage }) => {
  const isValid = !value || value.length <= ConductedByNameMaxLength
  const showError = !disabled && !isValid
  return (
    <div className={'domain-comment-block'}>
      <Label for={id} className={'conducted-by-input-label'}>
        {label}
      </Label>
      <Input
        className={showError ? 'conducted-by-name-field-err' : ''}
        type={'text'}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={ConductedByNameMaxLength}
      />
      {showError && (
        <div className={'form-field-error-message-container'}>
          <Icon className="text-danger" name="exclamation-triangle" size="xs" />
          <span className={'form-field-error-message'}>{errorMessage}</span>
        </div>
      )}
      {!disabled && (
        <span className={`form-field-length${showError ? '-err' : ''}`}>{`${
          value.length
        }/${ConductedByNameMaxLength}`}</span>
      )}
    </div>
  )
}

ConductedByNameField.defaultProps = {
  value: '',
  disabled: false,
  errorMessage: '',
}

ConductedByNameField.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default ConductedByNameField
