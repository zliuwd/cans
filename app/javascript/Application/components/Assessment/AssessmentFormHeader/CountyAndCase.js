import React from 'react'
import PropTypes from 'prop-types'
import { clientCaseReferralNumber } from '../../Client/Client.helper'

class CountyAndCase extends React.PureComponent {
  renderCaseNumber() {
    return this.props.serviceSourceUIId || 'No case/referral number exists'
  }

  render() {
    const { countyName, isAssessmentReady, serviceSource } = this.props

    return (
      <div id="county-and-case-info">
        {isAssessmentReady &&
          countyName && (
            <div className={'card-title-block'}>
              <span id={'county-name'}>{countyName}</span>
            </div>
          )}
        {isAssessmentReady && (
          <div>
            <div className={'case-referral-text'}>
              <span id={'case-or-referral-number-label'}>{clientCaseReferralNumber(serviceSource)}</span>
            </div>
            <div id={'case-or-referral-number'} className={'helper-text'}>
              <span>{this.renderCaseNumber()}</span>
            </div>
          </div>
        )}
      </div>
    )
  }
}

CountyAndCase.propTypes = {
  countyName: PropTypes.string,
  isAssessmentReady: PropTypes.bool.isRequired,
  serviceSource: PropTypes.string,
  serviceSourceUIId: PropTypes.string,
}

CountyAndCase.defaultProps = {
  countyName: null,
  serviceSource: null,
  serviceSourceUIId: null,
}

export default CountyAndCase
