import React from 'react'
import PropTypes from 'prop-types'
import Results from './Results'
import ResultsLoadingBoundary from './ResultsLoadingBoundary'

const QueryResults = ({ clearItems, fetch, getItemProps, highlightedIndex, isOpen, searchAfter, query }) => {
  return (
    <ResultsLoadingBoundary fetch={fetch} query={query} searchAfter={searchAfter}>
      <Results {...{ clearItems, getItemProps, highlightedIndex, isOpen }} />
    </ResultsLoadingBoundary>
  )
}

QueryResults.propTypes = {
  clearItems: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  getItemProps: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  query: PropTypes.any.isRequired,
  searchAfter: PropTypes.array,
}

QueryResults.defaultProps = {
  highlightedIndex: null,
  searchAfter: null,
}
export default QueryResults
