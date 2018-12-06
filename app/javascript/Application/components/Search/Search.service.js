import { apiGet } from '../../App.api'
import { encodedSearchAfterParams } from './SearchHelper'

export class SearchService {
  static getClients({ searchTerm, sortAfter = null }) {
    let endpoint = `/people_searches?search_term=${searchTerm}&is_client_only=true`

    if (sortAfter) {
      const saps = encodedSearchAfterParams(sortAfter)
      endpoint += `&${saps}`
    }

    return apiGet(endpoint)
  }
}
