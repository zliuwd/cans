import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@cwds/components'
import FullName from './FullName'
import Gender from './Gender'
import AgeInfo from './AgeInfo'
import LanguageInfo from './LanguageInfo'
import AddressInfo from './AddressInfo'
import LegacyInfo from './LegacyInfo'
import AkaInfo from './AkaInfo'

const PersonSuggestion = ({
  fullName,
  dateOfBirth,
  gender,
  address,
  languages,
  isSensitive,
  isSealed,
  legacyDescriptor,
  clientCounties,
  matchingAka,
}) => {
  return (
    <div className="row">
      <div className="col-md-5">
        <div className="row">
          <div className="col-md-4 profile-picture">
            <Icon className="user-icon" icon="user" />
            {isSensitive && <div className="information-flag image-caption">Sensitive</div>}
            {isSealed && <div className="information-flag image-caption">Sealed</div>}
          </div>
          <div className="col-md-7">
            <div className="row name-row">
              <FullName fullName={fullName} />
            </div>
            <div className="row">
              <AkaInfo aka={matchingAka} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <div className="row">
          <div className="col-md-4">
            <div className="row gender-age-row">
              <Gender gender={gender} />
              <AgeInfo dateOfBirth={dateOfBirth} />
            </div>
            <div className="row search-item-header">Primary Language</div>
            <div className="row">{<LanguageInfo languages={languages} />}</div>
          </div>
          <div className="col-md-5">
            <div className="row search-item-header">Client ID</div>
            <div className="row search-item">
              <LegacyInfo legacyUiId={legacyDescriptor.legacy_ui_id} />
            </div>
            <div className="row search-item-header">Active Address</div>
            <div className="row">{<AddressInfo {...address} />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

PersonSuggestion.defaultProps = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  address: {},
  languages: [],
  isSensitive: false,
  isSealed: false,
  legacyDescriptor: {},
  clientCounties: [],
  matchingAka: {},
}

PersonSuggestion.propTypes = {
  address: PropTypes.object,
  clientCounties: PropTypes.array,
  dateOfBirth: PropTypes.string,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  isSealed: PropTypes.bool,
  isSensitive: PropTypes.bool,
  languages: PropTypes.array,
  legacyDescriptor: PropTypes.object,
  matchingAka: PropTypes.object,
}

export default PersonSuggestion
