import { apiGet } from '../../App.api';

export class SecurityService {
  static checkPermission(permission) {
    return apiGet(`/security/check_permission/${permission}`);
  }
}

export default SecurityService;
