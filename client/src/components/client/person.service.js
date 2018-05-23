import { api } from '../../index';

export class PersonService {
  static fetchAllClients() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const data = {
      person_role: 'CLIENT'
    };
    return api.post('/people/_search', data)
      .then(response => {
        return response.data;
      })
  }
}

export default PersonService;
