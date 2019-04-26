import React from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'
import { Icon } from '@cwds/components'
import { ConductedByNameMaxLength } from '../AssessmentHelper'

const ConductedByNameField = ({ id, value, onChange, disabled, placeholder, errorMessage }) => {
  const isValid = !value || value.length <= ConductedByNameMaxLength
  const showError = !disabled && !isValid
  return (
    <div className={'domain-comment-block'}>
      <Input
        className={showError ? 'conducted-by-name-field-err' : ''}
        type={'text'}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={ConductedByNameMaxLength}
        placeholder={placeholder}
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
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default ConductedByNameField
