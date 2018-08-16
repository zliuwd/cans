import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Assessment, AssessmentFormHeader, AssessmentFormFooter, AssessmentService, I18nService } from './';
import Typography from '@material-ui/core/Typography';
import { PageInfo } from '../Layout';
import { ClientService } from '../Client/';
import { LoadingState, isReadyForAction } from '../../util/loadingHelper';
import {
  AssessmentStatus,
  AssessmentType,
  validateAssessmentForSubmit,
  defaultEmptyAssessment,
} from './AssessmentHelper';
import { DateTime } from 'luxon';

/* eslint-disable camelcase */
class AssessmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessment: defaultEmptyAssessment,
      assessmentServiceStatus: LoadingState.idle,
      i18n: {},
      child: {},
      isValidForSubmit: false,
      redirection: {
        shouldRedirect: false,
        successAssessmentId: null,
      },
    };
  }

  async componentDidMount() {
    const assessmentId = this.props.match.params.id;
    const { childId } = this.props.match.params;
    const child = await ClientService.fetch(childId).catch(() => {});
    this.setState({ child });
    assessmentId ? this.fetchAssessment(assessmentId) : this.fetchNewAssessment();
  }

  async fetchNewAssessment() {
    this.setState({ assessmentServiceStatus: LoadingState.waiting });
    try {
      const instrument = await AssessmentService.fetchNewAssessment();
      return this.onFetchNewAssessmentSuccess(instrument);
    } catch (e) {
      this.setState({ assessmentServiceStatus: LoadingState.error });
    }
  }

  onFetchNewAssessmentSuccess(instrument) {
    const assessment = {
      instrument_id: instrument.id,
      person: this.state.child,
      county: this.state.child.county,
      assessment_type: AssessmentType.initial,
      status: AssessmentStatus.inProgress,
      state: instrument.prototype,
      event_date: DateTime.local().toISODate(),
      has_caregiver: true,
      completed_as: 'COMMUNIMETRIC',
      can_release_confidential_info: false,
    };
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
    });
    this.fetchI18n(assessment.instrument_id);
  }

  async fetchAssessment(id) {
    this.setState({ assessmentServiceStatus: LoadingState.waiting });
    try {
      const assessment = await AssessmentService.fetch(id);
      return this.onFetchAssessmentSuccess(assessment);
    } catch (e) {
      this.setState({ assessmentServiceStatus: LoadingState.error });
    }
  }

  onFetchAssessmentSuccess(assessment) {
    this.updateAssessment(assessment);
    this.fetchI18n(assessment.instrument_id);
  }

  async fetchI18n(instrumentId) {
    try {
      const i18n = await I18nService.fetchByInstrumentId(instrumentId);
      this.onFetchI18nSuccess(i18n);
    } catch (e) {
      this.setState({ i18n: {} });
    }
  }

  onFetchI18nSuccess(i18n) {
    this.setState({
      i18n: i18n,
    });
  }

  updateAssessment = assessment => {
    const isValidForSubmit = validateAssessmentForSubmit(assessment);
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
      isValidForSubmit,
    });
  };

  initialSave(assessment) {
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
    });
    this.updateUrlWithAssessment(assessment);
  }

  updateUrlWithAssessment(assessment) {
    this.props.history.push(`/clients/${this.state.child.id}/assessments/${assessment.id}`);
  }

  handleSaveAssessment = async () => {
    this.setState({ assessmentServiceStatus: LoadingState.updating });
    const assessment = this.state.assessment;
    assessment.person = this.state.child;
    if (assessment.id) {
      try {
        const updatedAssessment = await AssessmentService.update(assessment.id, assessment);
        this.setState({
          assessment: updatedAssessment,
          assessmentServiceStatus: LoadingState.ready,
        });
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error });
      }
    } else {
      try {
        const updatedAssessment = await AssessmentService.postAssessment(assessment);
        this.initialSave(updatedAssessment);
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error });
      }
    }
  };

  handleSubmitAssessment = async () => {
    this.setState({ assessmentServiceStatus: LoadingState.updating });
    const assessment = Object.assign({}, this.state.assessment);
    assessment.status = AssessmentStatus.submitted;
    assessment.person = this.state.child;
    if (assessment.id) {
      try {
        const submittedAssessment = await AssessmentService.update(assessment.id, assessment);
        this.setState({
          assessmentServiceStatus: LoadingState.ready,
          redirection: {
            shouldRedirect: true,
            successAssessmentId: submittedAssessment.id,
          },
        });
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error });
      }
    } else {
      try {
        const submittedAssessment = await AssessmentService.postAssessment(assessment);
        this.updateUrlWithAssessment(submittedAssessment);
        this.setState({
          assessmentServiceStatus: LoadingState.ready,
          redirection: {
            shouldRedirect: true,
            successAssessmentId: submittedAssessment.id,
          },
        });
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error });
      }
    }
  };

  handleCancelClick = () => {
    this.setState({
      redirection: {
        shouldRedirect: true,
      },
    });
  };

  render() {
    const { child, redirection, isValidForSubmit, assessment, i18n, assessmentServiceStatus } = this.state;
    const { shouldRedirect, successAssessmentId } = redirection;
    if (shouldRedirect) {
      return <Redirect push to={{ pathname: `/clients/${child.id}`, state: { successAssessmentId } }} />;
    }
    const canPerformUpdates = isReadyForAction(assessmentServiceStatus);
    return (
      <Fragment>
        <PageInfo title={'Add CANS'} />
        <AssessmentFormHeader client={child} assessment={assessment} onAssessmentUpdate={this.updateAssessment} />
        <Assessment assessment={assessment} i18n={i18n} onAssessmentUpdate={this.updateAssessment} />
        <Typography variant="headline" className={'submit-validation-message'}>
          Assessment Date, Complete as, and all available ratings fields for the child/adolescent and applicable
          caregiver(s) must be completed prior to clicking the Submit button.
        </Typography>
        <AssessmentFormFooter
          onCancelClick={this.handleCancelClick}
          isSaveButtonEnabled={canPerformUpdates && !!this.state.assessment.event_date}
          onSaveAssessment={this.handleSaveAssessment}
          isSubmitButtonEnabled={canPerformUpdates && isValidForSubmit}
          onSubmitAssessment={this.handleSubmitAssessment}
        />
      </Fragment>
    );
  }
}
/* eslint-enable camelcase */

AssessmentContainer.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

AssessmentContainer.defaultProps = {
  match: {
    params: {},
  },
  history: {},
};

export default AssessmentContainer;
