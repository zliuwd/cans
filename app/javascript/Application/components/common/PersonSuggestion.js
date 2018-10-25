import AddressInfo from './AddressInfo';
import AgeInfo from './AgeInfo';
import GenderRaceAndEthnicity from './GenderRaceAndEthnicity';
import Languages from './LanguageInfo';
import PropTypes from 'prop-types';
import React from 'react';
import PhoneNumberInfo from './PhoneNumberInfo';
// import legacySourceFormatter from '../../util/legacySourceFormatter';
import sanitizeHtml from 'sanitize-html';
import AvatarImg from '../../../../assets/images/default-profile.svg';

const PersonSuggestion = ({
  fullName,
  first_name,
  middle_name,
  last_name,
  date_of_birth,
  isCsec,
  csec,
  isDeceased,
  gender,
  languages,
  races,
  ethnicity,
  ssn,
  addresses,
  phoneNumber,
  phone_numbers,
  client_counties,
  legacyDescriptor,
  legacy_descriptor,
  isSensitive,
  sensitivity_indicator,
  race_ethnicity,
  race_codes,
  isSealed,
  isProbationYouth,
}) => {


  const sanitizedField = field => ({
    dangerouslySetInnerHTML: { 
      __html: sanitizeHtml(field, { allowedTags: ['em'] }),
    },
  });
  // const legacySourceString = legacySourceFormatter(legacyDescriptor || {});

  return (
    <div className="row">
      <div className="col-md-2 profile-picture">
        <img src={AvatarImg} alt="Avatar" />
        {isSensitive && <div className="information-flag image-caption">Sensitive</div>}
        {isSealed && <div className="information-flag image-caption">Sealed</div>}
      </div>
      <div className="col-md-10">
        <div className="row">
          <div className="col-md-12">
            <strong className="highlighted" {...sanitizedField(first_name + " " +middle_name+ " " +last_name)}/>
            <div  {...sanitizedField("Client ID "+legacy_descriptor.legacy_ui_id+" in CWS-CMS") }/>
            {isCsec && <span className="information-flag search-result">CSEC</span>}
            {isDeceased && <span className="information-flag search-result">Deceased</span>}
            {isProbationYouth && <span className="information-flag search-result">Probation Youth</span>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <GenderRaceAndEthnicity gender={gender} races={race_ethnicity.race_codes} ethnicity={race_ethnicity} />
            <AgeInfo dateOfBirth={date_of_birth} />
 

          </div>
          <div className="col-md-6">
            {addresses && <AddressInfo type={addresses[0].type.description} streetAddress={ addresses[0].street_name} city={addresses[0].city} state={addresses[0].state} zip={addresses[0].zip} />}
           

            {phone_numbers && <PhoneNumberInfo number={phone_numbers[0].number} type={phone_numbers[0].type} />}
          </div>
        </div>
      </div>
    </div>
  );
};
PersonSuggestion.defaultProps = {
  address: {},
  dateOfBirth: '',
  ethnicity: {},
  fullName: '',
  gender: '',
  isCsec: false,
  isDeceased: false,
  isProbationYouth: false,
  isSealed: false,
  isSensitive: false,
  languages: [],
  // legacyDescriptor: {},
  phoneNumber: {},
  races: [],
  ssn: '',
};
PersonSuggestion.propTypes = {
  address: PropTypes.object,
  dateOfBirth: PropTypes.string,
  ethnicity: PropTypes.object,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  isCsec: PropTypes.bool,
  isDeceased: PropTypes.bool,
  isProbationYouth: PropTypes.bool,
  isSealed: PropTypes.bool,
  isSensitive: PropTypes.bool,
  languages: PropTypes.array,
  // legacyDescriptor: PropTypes.object,
  phoneNumber: PropTypes.object,
  races: PropTypes.array,
  ssn: PropTypes.string,
};

export default PersonSuggestion;
