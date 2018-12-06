import PropTypes from 'prop-types'
import React from 'react'
import './style.sass'

const SuggestionHeader = ({ page, currentNumberOfResults, totalResults, searchTerm }) => {
  const oneResult = 1
  const noResults = totalResults < oneResult
  const startPos = (page - 1) * 10 + 1
  const endPos = currentNumberOfResults === 10 ? page * 10 : page * 10 - (10 - currentNumberOfResults)
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
