import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import { defaultEmptyAssessment } from './AssessmentHelper';
import { getI18nByCode } from './I18nHelper';
import Domain from './Domain';

const INDICES = 'abcdefghijklmnopqrstuvwxyz';

class Assessment extends Component {
  /* eslint-disable camelcase */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.assessment.state.domains.length === 0 && nextProps.assessment.state.domains.length !== 0) {
      const assessment = cloneDeep(nextProps.assessment);
      this.updateCaregiverDomainsIndices(assessment.state);
      this.props.onAssessmentUpdate(assessment);
    }
  }
  /* eslint-enable camelcase */

  componentDidUpdate(prevProps) {
    const hasCaregiver = this.props.assessment.has_caregiver;
    const hasCaregiverChange = hasCaregiver !== prevProps.assessment.has_caregiver;
    if (hasCaregiverChange && !hasCaregiver) {
      this.removeAllCaregiverDomains();
    } else if (hasCaregiverChange && hasCaregiver) {
      this.addInitialCaregiverDomain();
    }
  }

  handleUpdateItemRating = (code, rating, caregiverIndex) => {
    this.updateItem(code, 'rating', rating, caregiverIndex);
  };

  handleUpdateItemConfidentiality = (code, isConfidential, caregiverIndex) => {
    this.updateItem(code, 'confidential', isConfidential, caregiverIndex);
  };

  updateItem = (itemCode, key, value, itemCaregiverIndex) => {
    const assessment = cloneDeep(this.props.assessment);
    assessment.state.domains.map(domain => {
      if (itemCaregiverIndex !== domain.caregiver_index) return;
      domain.items.map(item => {
        if (item.code === itemCode) {
          item[key] = value;
        }
      });
    });
    this.props.onAssessmentUpdate(assessment);
  };

  updateCaregiverDomainsIndices(assessmentState) {
    let i = 0;
    assessmentState.domains
      .filter(domain => domain.is_caregiver_domain)
      .map(domain => (domain.caregiver_index = INDICES[i++]));
    return assessmentState;
  }

  addCaregiverDomainAfter = caregiverIndex => {
    const assessment = cloneDeep(this.props.assessment);
    const domains = assessment.state.domains;
    for (let i = 0; i < domains.length; i++) {
      const domain = domains[i];
      if (domain.caregiver_index === caregiverIndex) {
        domains.splice(i + 1, 0, cloneDeep(assessment.state.caregiver_domain_template));
        break;
      }
    }
    this.updateCaregiverDomainsIndices(assessment.state);
    this.props.onAssessmentUpdate(assessment);
  };

  addInitialCaregiverDomain() {
    const assessment = cloneDeep(this.props.assessment);
    const domains = assessment.state.domains;
    if (assessment.state.under_six) {
      domains.splice(11, 0, cloneDeep(assessment.state.caregiver_domain_template));
    } else {
      domains.splice(5, 0, cloneDeep(assessment.state.caregiver_domain_template));
    }
    this.updateCaregiverDomainsIndices(assessment.state);
    this.props.onAssessmentUpdate(assessment);
  }

  removeCaregiverDomain = caregiverIndex => {
    const assessment = cloneDeep(this.props.assessment);
    const domains = assessment.state.domains;
    for (let i = 0; i < domains.length; i++) {
      const domain = domains[i];
      if (domain.caregiver_index === caregiverIndex) {
        domains.splice(i, 1);
        break;
      }
    }
    this.updateCaregiverDomainsIndices(assessment.state);
    this.props.onAssessmentUpdate(assessment);
  };

  removeAllCaregiverDomains() {
    const assessment = cloneDeep(this.props.assessment);
    const domains = assessment.state.domains;
    let caregiverDomains = domains.filter(domain => domain.is_caregiver_domain);
    for (const caregiverDomain of caregiverDomains) {
      domains.splice(domains.findIndex(domain => domain.id === caregiverDomain.id), 1);
    }
    this.updateCaregiverDomainsIndices(assessment.state);
    this.props.onAssessmentUpdate(assessment);
  }

  updateCaregiverName = (caregiverIndex, caregiverName) => {
    const assessment = cloneDeep(this.props.assessment);
    for (const domain of assessment.state.domains) {
      if (domain.caregiver_index === caregiverIndex) {
        domain.caregiver_name = caregiverName;
        break;
      }
    }
    this.props.onAssessmentUpdate(assessment);
  };

  render() {
    const i18n = this.props.i18n;
    const assessmentDto = this.props.assessment;
    const canReleaseConfidentialInfo = assessmentDto.can_release_confidential_info;
    const assessmentJson = assessmentDto.state;
    const isUnderSix = assessmentJson.under_six;
    const domains = assessmentJson.domains;
    return domains.map(domain => {
      const { code, caregiver_index: caregiverIndex } = domain;
      const domainI18n = getI18nByCode(i18n, code);
      return (
        <Domain
          key={code + caregiverIndex}
          domain={domain}
          i18n={domainI18n}
          i18nAll={i18n}
          assessmentUnderSix={isUnderSix}
          canReleaseConfidentialInfo={canReleaseConfidentialInfo}
          onRatingUpdate={this.handleUpdateItemRating}
          onConfidentialityUpdate={this.handleUpdateItemConfidentiality}
          onAddCaregiverDomain={this.addCaregiverDomainAfter}
          onRemoveCaregiverDomain={this.removeCaregiverDomain}
          onCaregiverNameUpdate={this.updateCaregiverName}
        />
      );
    });
  }
}

Assessment.propTypes = {
  assessment: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  onAssessmentUpdate: PropTypes.func.isRequired,
};

Assessment.defaultProps = {
  assessment: defaultEmptyAssessment,
  i18n: {},
};

export default Assessment;
