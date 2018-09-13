import { apiGet } from '../../App.api';

export class SensitivityTypesService {
  static fetch(countyId) {
    return apiGet(`/sensitivity_types?county=${countyId}`);
  }
}

export default SensitivityTypesService;
