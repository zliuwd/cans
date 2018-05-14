import { api } from './..';

export class AssessmentService {
  static fetch(id) {
    return api.get(`/assessments/${id}`).then(response => response.data);
  }
  static update(id, assessment) {
    return api.put(`/assessments/${id}`, assessment).then(response => response.data);
  }
}

export default AssessmentService;
