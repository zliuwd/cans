import appApi from '../../App.api';

export class ClientService {
  static fetch(id) {
    return appApi.get(`/people/${id}`).then(response => response.data);
  }

  static fetchAllClients() {
    const data = {
      person_role: 'CLIENT',
    };
    return appApi.post('/people/_search', data).then(response => {
      return response.data;
    });
  }

  static addClient(childInfoObj) {
    return appApi.post(`/people`, childInfoObj).then(response => response.data);
  }
  static getClient(id) {
    return appApi.get(`/people/${id}`).then(response => response.data);
  }
  static updateClient(id, childInfoObj) {
    return appApi.put(`/people/${id}`, childInfoObj).then(response => response.data);
  }
}

export default ClientService;
