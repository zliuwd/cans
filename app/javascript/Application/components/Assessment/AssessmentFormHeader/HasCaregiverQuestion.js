import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { stringify } from '../../../util/common'

const HasCaregiverQuestion = ({ hasCaregiver, onHasCaregiverChange, onHasCaregiverNoClicked }) => (
  <Fragment>
    <Typography id={'has-caregiver-label'} variant="headline" classes={{ root: 'assessment-form-header-label' }}>
      Child/Youth has Caregiver?
    </Typography>
    <FormControl>
      <fieldset>
        <legend />
        <RadioGroup
          id={'has-caregiver'}
          name={'has_caregiver'}
          value={stringify(hasCaregiver)}
          onChange={onHasCaregiverChange}
          className={'assessment-form-header-radio-group'}
        >
          <FormControlLabel
            id={'has-caregiver-yes'}
            value={stringify(true)}
            control={
              <Radio
                color="default"
                inputProps={{
                  id: 'input-has-caregiver-yes',
                  'aria-labelledby': 'has-caregiver-label',
                }}
              />
            }
            label={'Yes'}
            classes={{ label: 'assessment-form-header-label' }}
          />
          <FormControlLabel
            id={'has-caregiver-no'}
            value={stringify(false)}
            control={
              <Radio
                onClick={onHasCaregiverNoClicked}
                color="default"
                inputProps={{
                  id: 'input-has-caregiver-no',
                  'aria-labelledby': 'has-caregiver-label',
                }}
              />
            }
            label={'No'}
            classes={{ label: 'assessment-form-header-label' }}
          />
        </RadioGroup>
      </fieldset>
    </FormControl>
  </Fragment>
)

HasCaregiverQuestion.propTypes = {
  hasCaregiver: PropTypes.bool.isRequired,
  onHasCaregiverChange: PropTypes.func.isRequired,
  onHasCaregiverNoClicked: PropTypes.func.isRequired,
}

export default HasCaregiverQuestion
