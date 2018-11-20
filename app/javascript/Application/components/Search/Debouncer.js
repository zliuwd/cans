import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { selectPeopleResults } from '../Search/selectors/SearchSelectors'
import { systemCodes } from '../../enums/SystemCodes'
import { SearchService } from '../Search/Search.service'

class Debouncer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      totalResults: 0,
    }
    this.debounce = this.debounce.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  debounce(searchTerm, sortAfter = null) {
    const timeToWait = 400
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      SearchService.getClients({ searchTerm, sortAfter }).then(response => {
        const totalResults = response.hits.total
        const clients = response.hits.hits
        const clientData = { results: clients, systemCodes }
        const results = selectPeopleResults(clientData)

        this.setState({
          results,
          totalResults,
        })
      })
    }, timeToWait)
  }

  onClear() {
    this.setState({
      results: [],
      totalResults: 0,
    })
  }

  render() {
    const { results, totalResults } = this.state

    return React.cloneElement(this.props.children, {
      onChange: this.debounce,
      onClear: this.onClear,
      results,
      totalResults,
    })
  }
}

Debouncer.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Debouncer
