import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@cwds/components'

const UnderSixQuestion = ({ isUnderSix, onChange }) => (
  <Fragment>
    <div className={'assessment-form-header-select-template'}>Select CANS Template</div>
    <Button
      id={'age-0-5-button'}
      onClick={() => onChange(true)}
      className={isUnderSix === true ? 'age-button-selected' : 'age-button'}
    >
      Age: 0-5
    </Button>
    <Button
      id={'age-6-21-button'}
      onClick={() => onChange(false)}
      className={isUnderSix === false ? 'age-button-selected' : 'age-button'}
    >
      Age: 6-21
    </Button>
  </Fragment>
)

UnderSixQuestion.propTypes = {
  isUnderSix: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

UnderSixQuestion.defaultProps = {
  isUnderSix: null,
}
export default UnderSixQuestion
