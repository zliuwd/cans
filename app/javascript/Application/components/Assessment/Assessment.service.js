import { apiGet, apiPost, apiPut, apiDelete } from '../../App.api'

export class AssessmentService {
  static fetch(id) {
    return apiGet(`/assessments/${id}`)
  }
  static update(id, assessment) {
    return apiPut(`/assessments/${id}`, assessment)
  }
  static initializeAssessment(clientId) {
    return apiGet(`/clients/${clientId}/assessments/_initialize`)
  }
  static search(searchRequest) {
    return apiPost('/assessments/_search', searchRequest)
  }
  static getLatestInProgress() {
    return apiGet('/staff/assessments/latest')
  }
  static postAssessment(assessment) {
    return apiPost('/assessments', assessment)
  }
  static getAllChanges(id) {
    return apiGet(`/assessments/${id}/changes`)
  }

  static delete(id, reason) {
    return apiDelete(`/assessments/${id}`, { reason })
  }
}

export default AssessmentService
