import PropTypes from 'prop-types'
import React from 'react'
import './style.sass'

const SuggestionHeader = ({ currentNumberOfResults, totalResults, searchTerm }) => {
  const oneResult = 1
  const noResults = totalResults < oneResult
  if (totalResults === null) {
    return null
  }
  return (
    <div className="autocompleter-suggestion-header">
      <strong>
        {noResults
          ? `No results were found for "${searchTerm}"`
          : `Showing 1-${currentNumberOfResults} of ${totalResults} results for "${searchTerm}"`}
      </strong>
    </div>
  )
}
SuggestionHeader.defaultProps = {
  currentNumberOfResults: 0,
  totalResults: 0,
  searchTerm: '',
}
SuggestionHeader.propTypes = {
  currentNumberOfResults: PropTypes.number,
  searchTerm: PropTypes.string,
  totalResults: PropTypes.number,
}
export default SuggestionHeader
