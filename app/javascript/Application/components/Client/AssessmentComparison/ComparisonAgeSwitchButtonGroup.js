import React from 'react'
import PropTypes from 'prop-types'
import AgeRangeSwitch from '../../common/AgeRangeSwitch'

const ComparisonAgeSwitchButtonGroup = props => {
  return (
    <div className={'age-range-switch-container'}>
      <h5>{'Select CANS Template'}</h5>
      <AgeRangeSwitch isUnderSix={props.isUnderSix} onChange={props.ageSwitch} disabled={false} />
    </div>
  )
}

ComparisonAgeSwitchButtonGroup.propTypes = {
  ageSwitch: PropTypes.func.isRequired,
  isUnderSix: PropTypes.bool.isRequired,
}

export default ComparisonAgeSwitchButtonGroup
