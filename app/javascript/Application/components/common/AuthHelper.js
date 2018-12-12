const buildCreateAssessmentPermission = clientIdentifier => {
  return `client:createAssessment:${clientIdentifier}`
}

const buildCompleteAssessmentPermission = assessment => {
  let permission
  if (assessment && assessment.id !== null && assessment.id !== undefined) {
    permission = `assessment:complete:${assessment.id}`
  } else if (assessment && assessment.person !== null && assessment.person !== undefined) {
    permission = `client:completeAssessment:${assessment.person.identifier}`
  }
  return permission
}

export { buildCreateAssessmentPermission, buildCompleteAssessmentPermission }
