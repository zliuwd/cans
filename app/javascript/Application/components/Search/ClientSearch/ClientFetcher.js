import React from 'react'
import PropTypes from 'prop-types'
import { SearchService } from '../Search.service'
import { selectPeopleResults } from '../selectors/SearchSelectors'
import { systemCodes } from '../../../enums/SystemCodes'

const fetch = query =>
  SearchService.getClients({ searchTerm: query.searchTerm, sortAfter: query.searchAfter }).then(response => {
    const clients = response.hits.hits
    const clientData = { results: clients, systemCodes }
    return {
      ...query,
      items: selectPeopleResults(clientData),
      totalResults: response.hits.total,
    }
  })

const ClientFetcher = ({ children }) => React.cloneElement(children, { fetch })

ClientFetcher.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ClientFetcher
