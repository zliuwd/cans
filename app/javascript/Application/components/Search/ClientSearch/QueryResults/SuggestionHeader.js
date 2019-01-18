import PropTypes from 'prop-types'
import React from 'react'
import './style.sass'

const PAGE_SIZE = 10

const SuggestionHeader = ({ page, currentNumberOfResults, totalResults, searchTerm }) => {
  const noResults = totalResults < 1
  const unshownPreviousResults = (page - 1) * PAGE_SIZE
  const startPos = unshownPreviousResults + 1
  const endPos = unshownPreviousResults + currentNumberOfResults

  if (totalResults === null) {
    return null
  }

  return (
    <div className="autocompleter-suggestion-header">
      <strong>
        {noResults
          ? `No results were found for "${searchTerm}"`
          : `Showing ${startPos}-${endPos} of ${totalResults} results for "${searchTerm}"`}
      </strong>
    </div>
  )
}
SuggestionHeader.defaultProps = {
  page: 0,
  currentNumberOfResults: 0,
  totalResults: 0,
  searchTerm: '',
}
SuggestionHeader.propTypes = {
  currentNumberOfResults: PropTypes.number,
  page: PropTypes.number,
  searchTerm: PropTypes.string,
  totalResults: PropTypes.number,
}
export default SuggestionHeader
