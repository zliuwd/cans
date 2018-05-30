import appApi from '../../App.api';

export class CountiesService {
  static fetchCounties() {
    return appApi.get(`/counties`).then(response => response.data);
  }
}

export default CountiesService;
