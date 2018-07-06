import { DateTime } from 'luxon';

export const AssessmentType = Object.freeze({
  initial: 'INITIAL',
  subsequent: 'SUBSEQUENT',
  annual: 'ANNUAL',
  discharge: 'DISCHARGE',
  adminClose: 'ADMINISTRATIVE_CLOSE',
});

export const AssessmentStatus = Object.freeze({
  inProgress: 'IN_PROGRESS',
  submitted: 'SUBMITTED',
  approved: 'APPROVED',
});

export const defaultEmptyAssessment = {
  event_date: DateTime.local().toISODate(),
  state: {
    domains: [],
  },
};

export function validateAssessmentForSubmit(assessment) {
  return validateAssessmentDtoFields(assessment) && validateAssessmentState(assessment.state);
}

function validateAssessmentDtoFields(assessmentDto) {
  return (
    isDefined(assessmentDto.event_date) &&
    isDefined(assessmentDto.assessment_type) &&
    isDefined(assessmentDto.completed_as)
  );
}

function validateAssessmentState(assessment) {
  return isDefined(assessment.under_six) && areItemsValid(assessment);
}

function isDefined(value) {
  return typeof value !== 'undefined' && value !== null && value !== '';
}

function areItemsValid(assessment) {
  const isUnderSix = !!assessment.under_six;
  const requiredItems = assessment.domains
    .filter(domain => (isUnderSix && domain.under_six) || (!isUnderSix && domain.above_six))
    .reduce((items, domain) => items.concat(domain.items), [])
    .filter(item => (isUnderSix && item.under_six_id) || (!isUnderSix && item.above_six_id));
  const itemsWithNoRating = requiredItems.filter(item => item.rating === -1);
  return itemsWithNoRating.length === 0;
}
