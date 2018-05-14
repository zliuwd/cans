import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AssessmentFormHeader, Domain, DomainsGroup } from './';
import { AssessmentService, I18nService } from '../../services';
import { getI18nByCode } from './../../utils/i18nHelper';
import { isEmpty, clone } from 'lodash';

const HARDCODED_ASSESSMENT_ID = 50000;

class Assessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessment: {},
      assessment_status: 'idle',
      i18n: {},
      i18n_status: 'idle',
    };
  }

  static propTypes = {
    someFunction: PropTypes.func,
  };

  componentDidMount() {
    this.fetchAssessment(HARDCODED_ASSESSMENT_ID);
  }

  fetchAssessment = (id) => {
    this.setState({ assessment_status: 'waiting' });
    return AssessmentService.fetch(id)
      .then(this.onFetchAssessmentSuccess)
      .catch(() => this.setState({ assessment_status: 'error' }));
  };

  onFetchAssessmentSuccess = assessment => {
    this.setState({
      assessment: assessment,
      assessment_status: 'ready',
    });
    this.fetchI18n(assessment.instrument_id);
  };

  fetchI18n = (instrumentId) => {
    this.setState({ i18n_status: 'waiting' });
    return I18nService.fetchByInstrumentId(instrumentId)
      .then(this.onFetchI18nSuccess)
      .catch(() => this.setState({ i18n_status: 'error' }));
  };

  onFetchI18nSuccess = i18n => {
    this.setState({
      i18n: i18n,
      i18n_status: 'ready',
    });
  };

  updateAssessment = (assessment) => {
    this.setState({ assessment_status: 'updating' });
    AssessmentService.update(assessment.id, assessment)
      .then(updatedAssessment => {
        this.setState({
          assessment: updatedAssessment,
          assessment_status: 'ready'
        })
      })
      .catch(() => this.setState({ assessment_status: 'error' }));

  };

  updateItem = (code, rating) => {
    // TODO(dd): rewrite with for loops to break when found
    const updateAssessment = clone(this.state.assessment);
    updateAssessment.state.domains.map(assessmentChild => {
      if (assessmentChild.class === 'domain') {
        assessmentChild.items.map(item => {
          if (item.code === code) {
            item.rating = rating;
          }
        })
      } else {
        assessmentChild.domains.map(domain => {
          domain.items.map(item => {
            if (item.code === code) {
              item.rating = rating;
            }
          })
        })
      }
    });

    this.updateAssessment(updateAssessment);
  };

  renderDomains = domains => {
    const i18n = this.state.i18n;
    if (isEmpty(i18n)) {
      return;
    }

    return domains.map(child => {
      const code = child.code;
      const childI18n = getI18nByCode(i18n, code);
      return child.class === 'domain' ? (
        <Domain key={code} domain={child} i18n={childI18n} i18nAll={i18n} onRatingUpdate={this.updateItem} />
      ) : (
        <DomainsGroup key={code} domainsGroup={child} i18n={childI18n} i18nAll={i18n} onRatingUpdate={this.updateItem} />
      )

    });
  };

  render = () => {
    const assessmentState = this.state.assessment.state;
    const domains = assessmentState ? assessmentState.domains : [];
    return (
      <Fragment>
        <AssessmentFormHeader style={{ 'margin-bottom': '25px' }}/>
        { this.renderDomains(domains) }
      </Fragment>
    );
  };
}

export default Assessment;
