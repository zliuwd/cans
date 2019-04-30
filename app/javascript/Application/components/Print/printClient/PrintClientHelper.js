import PropTypes from 'prop-types'

export const composeUpdatedByName = assessment => {
  return assessment.updated_by
    ? `${assessment.updated_by.first_name} ${assessment.updated_by.last_name}`
    : assessment.created_by
      ? `${assessment.created_by.first_name} ${assessment.created_by.last_name}`
      : ''
}

export const comparisonDataType = PropTypes.shape({
  currentDataKey: PropTypes.string.isRequired,
  data: PropTypes.shape({
    aboveSix: PropTypes.object.isRequired,
    underSix: PropTypes.object.isRequired,
  }),
  i18n: PropTypes.object.isRequired,
})

export const assessmentsHistoryDataType = PropTypes.shape({
  assessments: PropTypes.array.isRequired,
})
