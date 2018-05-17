import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AssessmentFormHeader, Domain, DomainsGroup } from './';
import { AssessmentService, I18nService } from '../../services';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { getI18nByCode } from './../../utils/i18nHelper';
import { clone } from 'lodash';
import AssessmentFormFooter from './Footer/AssessmentFormFooter';

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

  handleUpdateItemRating = (code, rating) => {
    this.updateAndStoreItem(code, 'rating', rating);
  };

  handleUpdateItemConfidentiality = (code, isConfidential) => {
    this.updateAndStoreItem(code, 'confidential', isConfidential);
  };

  updateAndStoreItem = (itemCode, key, value) => {
    const updateAssessment = clone(this.state.assessment);
    updateAssessment.state.domains.map(assessmentChild => {
      if (assessmentChild.class === 'domain') {
        assessmentChild.items.map(item => {
          if (item.code === itemCode) {
            item[key] = value;
          }
        })
      } else {
        assessmentChild.domains.map(domain => {
          domain.items.map(item => {
            if (item.code === itemCode) {
              item[key] = value;
            }
          })
        })
      }
    });

    this.updateAssessment(updateAssessment);
  };

  handleUnderSixStateNegate = onChangeEvent => {
    const updateAssessment = clone(this.state.assessment);
    const oldValue = onChangeEvent.target.value === 'true';
    updateAssessment.state.under_six = !oldValue;
    this.updateAssessment(updateAssessment);
  };

  renderDomains = domains => {
    const i18n = this.state.i18n || {};
    const { under_six } = ((this.state.assessment || {}).state || {});
    return domains.map(child => {
      const code = child.code;
      const childI18n = getI18nByCode(i18n, code);
      return child.class === 'domain' ? (
        <Domain
          key={code}
          domain={child}
          i18n={childI18n}
          i18nAll={i18n}
          assessmentUnderSix={under_six}
          onRatingUpdate={this.handleUpdateItemRating}
          onConfidentialityUpdate={this.handleUpdateItemConfidentiality}
        />
      ) : (
        <DomainsGroup
          key={code}
          domainsGroup={child}
          i18n={childI18n}
          i18nAll={i18n}
          assessmentUnderSix={under_six}
          onRatingUpdate={this.handleUpdateItemRating}
          onConfidentialityUpdate={this.handleUpdateItemConfidentiality}
        />
      )
    });
  };

  render = () => {
    const assessmentState = this.state.assessment.state || {};
    const isUnderSix = assessmentState.under_six || false;
    const domains = assessmentState.domains || [];
    return (
      <Fragment>
        <AssessmentFormHeader/>
        <Typography variant="body1" style={{ "text-align": "right" }}>
          0-5
          <FormControlLabel
            control={
              <Switch
                checked={!isUnderSix}
                value={isUnderSix}
                onChange={this.handleUnderSixStateNegate}
                color="default"
              />
            }
            label="6-21"
            style={{ "margin-left": "0px"}}
          />
        </Typography>
        { this.renderDomains(domains) }
        <AssessmentFormFooter/>
      </Fragment>
    );
  };
}

export default Assessment;
