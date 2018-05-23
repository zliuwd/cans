import appApi from '../../App.api';

export class AssessmentService {
  static fetch(id) {
    return appApi.get(`/assessments/${id}`).then(response => response.data);
  }
  static update(id, assessment) {
    return appApi.put(`/assessments/${id}`, assessment).then(response => response.data);
  }
}

export default AssessmentService;
