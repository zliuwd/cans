import React from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'

const ConductedByField = ({ id, value, onChange, disabled }) => (
  <Input
    type={'text'}
    className={'assessment-form-header-input'}
    id={id}
    value={value}
    onChange={onChange}
    disabled={disabled}
    maxLength={100}
  />
)

ConductedByField.defaultProps = {
  id: 'conducted-by',
  value: '',
  onChange: () => {},
  disabled: false,
}

ConductedByField.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ConductedByField
