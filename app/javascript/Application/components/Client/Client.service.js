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

  static search({ firstName, middleName, lastName, dob, pagination: { page, pageSize } }) {
    const payload = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      dob,
      person_role: 'CLIENT',
      pagination: {
        page,
        page_size: pageSize,
      },
    };
    return apiPost('/people/_search', payload);
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
