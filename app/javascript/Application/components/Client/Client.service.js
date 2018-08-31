import { apiGet, apiPost, apiPut } from '../../App.api';

export class ClientService {
  static fetch(id) {
    return apiGet(`/people/${id}`);
  }

  static fetchAllClients() {
    const data = {
      person_role: 'CLIENT',
    };
    return apiPost('/people/_search', data);
  }

  static addClient(childInfoObj) {
    return apiPost(`/people`, childInfoObj);
  }

  static getClient(id) {
    return this.fetch(id);
  }

  static updateClient(id, childInfoObj) {
    return apiPut(`/people/${id}`, childInfoObj);
  }
}

export default ClientService;
