import { apiGet } from '../../App.api'

export class SearchService {
  static getClients({ searchTerm }) {
    const endpoint = `/people_searches?search_term=${searchTerm}&is_client_only=true`

    return apiGet(endpoint)
  }
}
