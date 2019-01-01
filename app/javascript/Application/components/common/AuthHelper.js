const isCompleteAssessmentAuthorized = (assessment, client) => {
  let result = false
  if (assessment && assessment.id !== null && assessment.id !== undefined) {
    result = isAuthorized(assessment, 'complete')
  } else if (client) {
    result = isAuthorized(client, 'completeAssessment')
  }
  return result
}

const isAuthorized = (entity, operation) =>
  Boolean(
    entity.metadata && entity.metadata.allowed_operations && entity.metadata.allowed_operations.includes(operation)
  )

export { isAuthorized, isCompleteAssessmentAuthorized }
