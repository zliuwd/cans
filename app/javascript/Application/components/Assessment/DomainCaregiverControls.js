import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@cwds/components'
import './style.sass'

const DomainCaregiverControls = props => {
  return (
    <div className={'caregiver-domain-add-remove'}>
      <Button
        color="link"
        onClick={props.onRemoveCaregiverDomain}
        onKeyPress={props.onRemoveCaregiverDomain}
        className={'caregiver-domain-add-remove-links'}
        aria-label="remove caregiver button"
        tabIndex={0}
      >
        - REMOVE CAREGIVER
      </Button>
      <Button
        color="link"
        onClick={props.onAddCaregiverDomain}
        onKeyPress={props.onAddCaregiverDomain}
        className={'caregiver-domain-add-remove-links'}
        aria-label="add caregiver button"
        tabIndex={0}
      >
        + ADD CAREGIVER
      </Button>
    </div>
  )
}

DomainCaregiverControls.propTypes = {
  onAddCaregiverDomain: PropTypes.func.isRequired,
  onRemoveCaregiverDomain: PropTypes.func.isRequired,
}

export default DomainCaregiverControls
