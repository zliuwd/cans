import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { selectPeopleResults } from './selectors/SearchSelectors'
import { systemCodes } from '../../enums/SystemCodes'
import { SearchService } from './Search.service'

const defaultState = {
  allResults: [],
  results: [],
  totalResults: 0,
  page: 0,
  lastPageFetched: 0,
}

class Debouncer extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState
    this.getPrevPage = this.getPrevPage.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
    this.getClientResultData = this.getClientResultData.bind(this)
    this.getResultsSubset = this.getResultsSubset.bind(this)
    this.debounce = this.debounce.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  async getPrevPage() {
    const { page } = this.state
    const newPage = page - 1
    await this.getResultsSubset(newPage)
  }

  async getNextPage(searchTerm, sortAfter) {
    const { page, lastPageFetched } = this.state
    const newPage = page + 1
    // if the new page is greater than the last fetched page, then fetch new clients results
    // else, get the subset of results from allResults
    if (newPage > lastPageFetched) {
      await this.getClientResultData(newPage, searchTerm, sortAfter)
    } else {
      await this.getResultsSubset(newPage)
    }
  }

  async getResultsSubset(newPage) {
    const { allResults, lastPageFetched } = this.state
    const defaultStartPos = 0
    const defaultEndPos = 10
    const startPos = newPage === 1 ? defaultStartPos : newPage * 10 - 10
    const endPos = newPage === 1 ? defaultEndPos : newPage * 10
    const results = await allResults.slice(startPos, endPos)

    this.setState({
      results,
      page: newPage,
      lastPageFetched: newPage > lastPageFetched ? newPage : lastPageFetched,
    })
  }

  async getClientResultData(newPage, searchTerm, sortAfter = null) {
    const { allResults } = this.state
    const response = await SearchService.getClients({ searchTerm, sortAfter })
    const totalResults = response.hits.total
    const clients = response.hits.hits
    const clientResultsAndSystemCodes = { results: clients, systemCodes }
    const results = selectPeopleResults(clientResultsAndSystemCodes)
    const combinedResults = allResults.concat(results)

    this.setState({
      allResults: combinedResults,
      results,
      totalResults,
      page: newPage,
      lastPageFetched: newPage,
    })
  }

  debounce(searchTerm) {
    const timeToWait = 400
    const firstPage = 1
    clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      await this.getClientResultData(firstPage, searchTerm)
    }, timeToWait)
  }

  onClear() {
    this.setState(defaultState)
  }

  render() {
    const { results, totalResults, page } = this.state
    return React.cloneElement(this.props.children, {
      onChange: this.debounce,
      getPrevPage: this.getPrevPage,
      getNextPage: this.getNextPage,
      onClear: this.onClear,
      results,
      totalResults,
      page,
    })
  }
}

Debouncer.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Debouncer
