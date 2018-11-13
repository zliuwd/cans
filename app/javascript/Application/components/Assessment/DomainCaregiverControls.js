import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'

const DomainCaregiverControls = props => {
  return (
    <div className={'caregiver-domain-controls'}>
      <h5>
        <ul className={'caregiver-domain-controls-list'}>
          <li>
            <div
              onClick={props.onRemoveCaregiverDomain}
              onKeyPress={props.onRemoveCaregiverDomain}
              className={'caregiver-control'}
              role={'button'}
              aria-label="remove caregiver button"
              tabIndex={0}
            >
              - REMOVE CAREGIVER
            </div>
          </li>
          <li>
            <div
              onClick={props.onAddCaregiverDomain}
              onKeyPress={props.onAddCaregiverDomain}
              className={'caregiver-control'}
              role={'button'}
              aria-label="add caregiver button"
              tabIndex={0}
            >
              + ADD CAREGIVER
            </div>
          </li>
        </ul>
      </h5>
    </div>
  )
}

DomainCaregiverControls.propTypes = {
  onAddCaregiverDomain: PropTypes.func.isRequired,
  onRemoveCaregiverDomain: PropTypes.func.isRequired,
}

export default DomainCaregiverControls
