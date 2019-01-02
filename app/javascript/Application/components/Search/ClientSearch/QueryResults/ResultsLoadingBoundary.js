import React from 'react'
import PropTypes from 'prop-types'
import Aggregator from './Aggregator'
import LoadingBoundary from '../../../common/LoadingBoundary'

const fetchFactory = (fetch, query) => () =>
  query.searchTerm
    ? fetch(query).then(response => ({
        ...query,
        ...response,
      }))
    : { ...query, items: [], totalResults: 0 }

const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b)

class ResultsLoadingBoundary extends React.PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (!compare(props.query, state.query) || !compare(props.searchAfter, state.searchAfter)) {
      const combinedQuery = props.searchAfter ? { ...props.query, searchAfter: props.searchAfter } : props.query
      return {
        fetch: fetchFactory(props.fetch, combinedQuery),
        searchAfter: props.searchAfter,
        query: props.query,
      }
    }
    return null
  }

  render() {
    return (
      <LoadingBoundary childNodeFetchedPropName={'data'} fetch={this.state.fetch}>
        <Aggregator childNodeFetchedPropName={'results'} query={this.state.query}>
          {this.props.children}
        </Aggregator>
      </LoadingBoundary>
    )
  }
}

ResultsLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fetch: PropTypes.func.isRequired,
  query: PropTypes.shape({
    searchTerm: PropTypes.string.isRequired,
    searchAfter: PropTypes.array,
  }).isRequired,
  searchAfter: PropTypes.array,
}

ResultsLoadingBoundary.defaultProps = {
  searchAfter: null,
}

export default ResultsLoadingBoundary
