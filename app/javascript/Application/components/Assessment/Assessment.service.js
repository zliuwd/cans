import { apiGet, apiPost, apiPut, apiDelete } from '../../App.api'

export class AssessmentService {
  static fetch(id) {
    return apiGet(`/assessments/${id}`)
  }
  static update(id, assessment) {
    return apiPut(`/assessments/${id}`, assessment)
  }
  static fetchNewAssessment() {
    return apiGet('/instruments/1')
  }
  static search(searchRequest) {
    return apiPost('/assessments/_search', searchRequest)
  }
  static getAllAssessments() {
    return apiGet('/staff/assessments')
  }
  static postAssessment(assessment) {
    return apiPost('/assessments', assessment)
  }
  static getAllChanges(id) {
    return apiGet(`/assessments/${id}/changes`)
  }

  static delete(id) {
    return apiDelete(`/assessments/${id}`)
  }
}

export default AssessmentService
