import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clone } from 'lodash';
import { defaultEmptyAssessment } from './AssessmentHelper';
import { getI18nByCode } from './I18nHelper';
import Domain from './Domain';

class Assessment extends Component {
  handleUpdateItemRating = (code, rating) => {
    this.updateItem(code, 'rating', rating);
  };

  handleUpdateItemConfidentiality = (code, isConfidential) => {
    this.updateItem(code, 'confidential', isConfidential);
  };

  updateItem = (itemCode, key, value) => {
    const { assessment, onAssessmentUpdate } = this.props;
    const newAssessment = clone(assessment);
    newAssessment.state.domains.map(assessmentChild => {
      assessmentChild.items.map(item => {
        if (item.code === itemCode) {
          item[key] = value;
        }
      });
    });
    onAssessmentUpdate(newAssessment);
  };

  render() {
    const i18n = this.props.i18n;
    const assessmentDto = this.props.assessment;
    const canReleaseConfidentialInfo = assessmentDto.can_release_confidential_info;
    const assessmentJson = assessmentDto.state;
    const isUnderSix = assessmentJson.under_six;
    const domains = assessmentJson.domains;
    return domains.map(domain => {
      const domainCode = domain.code;
      const domainI18n = getI18nByCode(i18n, domainCode);
      return (
        <Domain
          key={domainCode}
          domain={domain}
          i18n={domainI18n}
          i18nAll={i18n}
          assessmentUnderSix={isUnderSix}
          onRatingUpdate={this.handleUpdateItemRating}
          onConfidentialityUpdate={this.handleUpdateItemConfidentiality}
          canReleaseConfidentialInfo={canReleaseConfidentialInfo}
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
