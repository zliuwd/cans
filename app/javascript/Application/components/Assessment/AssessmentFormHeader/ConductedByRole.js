import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '@cwds/components'
import { Label } from 'reactstrap'
import { ConductedByRoleOptions } from '../AssessmentHelper'
import { findSelectOptionByValue } from '../../../util/common'

const ConductedByRole = ({ value, onChange, disabled }) => {
  const selectedOption = findSelectOptionByValue(value, ConductedByRoleOptions)
  const id = 'conducted-by-role'
  const labelId = `${id}-label`
  return (
    <div>
      <Label id={labelId} for={id} className={'conducted-by-input-label'}>
        Select Role *
      </Label>
      <Select
        className={'assessment-form-header-input-role'}
        isDisabled={disabled}
        placeholder={''}
        id={id}
        classNamePrefix={'list'}
        aria-labelledby={labelId}
        options={ConductedByRoleOptions}
        value={selectedOption}
        onChange={onChange}
        isSearchable={true} // https://github.com/JedWatson/react-select/issues/2740
      />
    </div>
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
