import appApi  from '../../App.api';

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
    return appApi.post('/people/_search', data)
      .then(response => {
        return response.data;
      })
  }
}

export default PersonService;
