import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Select } from '@cwds/components'
import { Label } from 'reactstrap'
import { ConductedByRoleOptions } from '../AssessmentHelper'
import { findSelectOptionByValue } from '../../../util/common'

class ConductedByRole extends PureComponent {
  handleConductedByRoleChange = event => {
    this.props.onChange('conducted_by_role', event.value)
  }

  render() {
    const { value, disabled } = this.props
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
          onChange={this.handleConductedByRoleChange}
          isSearchable={true} // https://github.com/JedWatson/react-select/issues/2740
        />
      </div>
    )
  }
}

ConductedByRole.defaultProps = {
  value: '',
  disabled: false,
}

ConductedByRole.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default ConductedByRole
