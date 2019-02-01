import { getCurrentIsoDate } from '../../util/dateHelper'
import moment from 'moment'
import { globalAlertService } from '../../util/GlobalAlertService'
import { urlTrimmer } from '../../util/urlTrimmer'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

export const AssessmentType = Object.freeze({
  initial: 'INITIAL',
  subsequent: 'SUBSEQUENT',
  annual: 'ANNUAL',
  discharge: 'DISCHARGE',
  adminClose: 'ADMINISTRATIVE_CLOSE',
})

export const AssessmentStatus = Object.freeze({
  inProgress: 'IN_PROGRESS',
  completed: 'COMPLETED',
  approved: 'APPROVED',
  deleted: 'DELETED',
})

export const defaultEmptyAssessment = {
  event_date: getCurrentIsoDate(),
  has_caregiver: true,
  state: {
    domains: [],
  },
}

export function validateAssessmentForSubmit(assessment) {
  return validateAssessmentDtoFields(assessment) && validateAssessmentState(assessment.state)
}

function validateAssessmentDtoFields(assessmentDto) {
  return (
    isDefined(assessmentDto.event_date) &&
    validateAssessmentEventDate(assessmentDto.person.dob, assessmentDto.event_date) &&
    isDefined(assessmentDto.assessment_type) &&
    isDefined(assessmentDto.completed_as) &&
    isDefined(assessmentDto.has_caregiver)
  )
}

function validateAssessmentState(assessment) {
  return isDefined(assessment.under_six) && areItemsValid(assessment)
}

export function validateAssessmentEventDate(dob, eventDate) {
  if (!eventDate) return false
  if (!dob) return true
  return moment(dob).isBefore(moment(eventDate))
}

function isDefined(value) {
  return typeof value !== 'undefined' && value !== null && value !== ''
}

function areItemsValid(assessment) {
  const isUnderSix = Boolean(assessment.under_six)
  const requiredItems = assessment.domains
    .filter(domain => shouldDomainBeRendered(isUnderSix, domain))
    .reduce((items, domain) => items.concat(domain.items), [])
    .filter(item => shouldItemBeRendered(isUnderSix, item))
  const itemsWithNoRating = requiredItems.filter(item => item.rating === -1)
  return itemsWithNoRating.length === 0
}

export function resetConfidentialByDefaultItems(assessment) {
  assessment.state.domains.map(domain => {
    domain.items.map(item => {
      if (item.confidential_by_default) {
        item.confidential = true
      }
    })
  })
  return assessment
}

export function shouldDomainBeRendered(isAssessmentUnderSix, domain) {
  if (isAssessmentUnderSix === null || isAssessmentUnderSix === undefined) {
    return false
  }
  return (isAssessmentUnderSix && domain.under_six) || (!isAssessmentUnderSix && domain.above_six)
}

export function shouldItemBeRendered(isAssessmentUnderSix, item) {
  return (isAssessmentUnderSix && item.under_six_id) || (!isAssessmentUnderSix && item.above_six_id)
}

export function getActionVerbByStatus(status) {
  switch (status) {
    case AssessmentStatus.inProgress:
      return 'Saved'
    case AssessmentStatus.completed:
      return 'Completed'
    case AssessmentStatus.deleted:
      return 'Deleted'
    default:
      return 'Updated'
  }
}

export function getDisplayAssessmentStatus(status) {
  switch (status) {
    case AssessmentStatus.inProgress:
      return 'In Progress'
    case AssessmentStatus.completed:
      return 'Completed'
    case AssessmentStatus.deleted:
      return 'Deleted'
    default:
      return 'Updated'
  }
}

export function sortAssessments(assessments) {
  if (!assessments || assessments.length === 0) return []
  return assessments
    .map(assessment => ({
      ...assessment,
      eventDateMoment: moment(assessment.event_date),
      createdTimestampMoment: moment(assessment.created_timestamp),
    }))
    .sort(
      (left, right) =>
        right.eventDateMoment.diff(left.eventDateMoment) || right.createdTimestampMoment - left.createdTimestampMoment
    )
}

export function trimUrlForClientProfile(url) {
  const urlArray = url.split('/')
  const targetIndex = urlArray.indexOf('assessments') // start
  const compare = urlArray.length - targetIndex // check if assessments is the ending or not
  const deleteCount = compare + 1
  const linkUrl = urlTrimmer(url, targetIndex, deleteCount)
  return linkUrl
}

export const successMsgFrom = Object.freeze({
  COMPLETE: 'COMPLETE',
  SAVE: 'SAVE',
})

export function postSuccessMessage(url, msgfrom) {
  const linkUrl = trimUrlForClientProfile(url)
  let message
  if (msgfrom === successMsgFrom.SAVE) {
    message = (
      <Fragment>
        Success! CANS assessment has been saved. <Link to={linkUrl}>Click here</Link> to return to Child/Youth profile.
      </Fragment>
    )
  } else if (msgfrom === successMsgFrom.COMPLETE) {
    message = (
      <Fragment>
        Success! CANS assessment has been completed. <Link to={linkUrl}>Click here</Link> to return to Child/Youth
        profile.
      </Fragment>
    )
  } else {
    message = 'error'
  }
  globalAlertService.postSuccess({ message })
}

export const INFO_GLOBAL_ALERT_ID = 'infoMessages'

export function postInfoMessage({ message, isAutoCloseable = false, componentId = INFO_GLOBAL_ALERT_ID, messageId }) {
  globalAlertService.postInfo({
    message,
    isAutoCloseable,
    componentId,
    messageId,
  })
}

export function postCloseMessage(messageId = undefined) {
  globalAlertService.closeAlert(messageId)
}

export const caregiverWarning = (
  <div>
    You are about to remove the <strong className="cargiver-text-block">caregiver</strong> from this Assessment.
  </div>
)

export const completeTip = (
  <Typography variant="headline" className={'submit-validation-message'}>
    The Assessment Date and all assessment ratings must be completed before the Complete button becomes active.
  </Typography>
)

export const selectOptions = [
  { value: 'Entered in error', label: 'Entered in error' },
  { value: 'Referal / Case closed', label: 'Referal / Case closed' },
  { value: 'Family refused', label: 'Family refused' },
  { value: 'Other', label: 'Other' },
]

export const blankPlaceHolder = { value: '', label: '' }

export const deleteWarningTitle = 'Choose or enter the reason for deleting this CANS.'

export const deleteWarningDescription = 'This cannot be undone.'

export const otherReasonLabel = 'Enter other reason. *'

export const reasonSelectLabel = 'Reason for deleting. *'

export const statusTextOfHistory = (status, isForTable) => {
  const text = getDisplayAssessmentStatus(status)
  return isForTable ? null : text
}
