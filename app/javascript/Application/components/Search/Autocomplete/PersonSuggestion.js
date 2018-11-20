import React from 'react'
import PropTypes from 'prop-types'
import AvatarImg from '../../../../../assets/images/default-profile.svg'
import FullName from './SearchResults/FullName'
import Gender from './SearchResults/Gender'
import AgeInfo from './SearchResults/AgeInfo'
import LanguageInfo from './SearchResults/LanguageInfo'
import AddressInfo from './SearchResults/AddressInfo'
import LegacyInfo from './SearchResults/LegacyInfo'

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
}) => {
  return (
    <div className="row">
      <div className="col-md-5">
        <div className="row">
          <div className="col-md-4 profile-picture">
            <img className="avatar-img" src={AvatarImg} alt="Avatar" />
            {isSensitive && <div className="information-flag image-caption">Sensitive</div>}
            {isSealed && <div className="information-flag image-caption">Sealed</div>}
          </div>
          <div className="col-md-7">
            <div className="row name-row">
              <FullName fullName={fullName} />
            </div>
            <div className="row gender-age-row">
              <Gender gender={gender} />
              <AgeInfo dateOfBirth={dateOfBirth} />
            </div>
            <div className="row search-item-header">Primary Language</div>
            <div className="row">{<LanguageInfo languages={languages} />}</div>
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <div className="row county-client-case-row">
          <div className="col-md-4">
            <div className="row search-item-header">County of Jurisdiction</div>
            <div className="row">
              <span className="client-county">{clientCounties[0]}</span>
            </div>
          </div>
          <div className="col-md-5">
            <div className="row search-item-header">Client ID</div>
            <div className="row">
              <LegacyInfo legacyUiId={legacyDescriptor.legacy_ui_id} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
}

export default PersonSuggestion
