import appApi from '../../App.api';

export class SecurityService {
  static checkPermission(permission) {
    return appApi.get(`/security/check_permission/${permission}`).then(response => response.data);
  }
}

export default SecurityService;
