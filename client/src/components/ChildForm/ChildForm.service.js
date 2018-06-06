import appApi from '../../App.api';
export class ChildFormService {
  static createChild(child) {
    return appApi.post(`/people`, child).then(response => response.data);
  }
}

export default ChildFormService;
