import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '@cwds/components'
import { ConductedByRoleOptions } from '../AssessmentHelper'
import { findSelectOptionByValue } from '../../../util/common'

const ConductedByRole = ({ value, onChange, disabled }) => {
  const selectedOption = findSelectOptionByValue(value, ConductedByRoleOptions)
  return (
    <Select
      className={'assessment-form-header-input-role'}
      isDisabled={disabled}
      placeholder={'Role'}
      id={'conducted-by-role'}
      classNamePrefix={'list'}
      options={ConductedByRoleOptions}
      value={selectedOption}
      onChange={onChange}
      isSearchable={false}
    />
  )
}

ConductedByRole.defaultProps = {
  value: '',
  placeholder: undefined,
  disabled: false,
}

ConductedByRole.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default ConductedByRole
