import React from 'react'
import PropTypes from 'prop-types'
import SuggestionHeader from './SuggestionHeader'
import { PersonSuggestion } from './PersonSuggestion'
import ShowMoreResultsButton from './ShowMoreResultsButton'
import { showMoreResults } from '../SearchActions'

const Results = ({
  clearItems,
  getItemProps,
  highlightedIndex,
  isOpen,
  onLoadMoreResults,
  results: { items, totalResults, searchTerm },
}) => {
  clearItems()

  const hasMoreResults = items.length < totalResults
  const nextSearchAfter = items.length > 0 && items[items.length - 1].sort

  return isOpen ? (
    <div>
      <div className={'suggestion-header-wrapper'} key="header" aria-live="polite">
        <SuggestionHeader
          page={1}
          currentNumberOfResults={items.length}
          totalResults={totalResults}
          searchTerm={searchTerm}
        />
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          {...getItemProps({
            item,
            index,
            className: `search-list-box search-item${highlightedIndex === index ? ' highlighted-search-item' : ''}`,
            key: index,
          })}
        >
          <PersonSuggestion {...item} />
        </div>
      ))}
      {hasMoreResults ? (
        <ShowMoreResultsButton
          {...getItemProps({
            key: 'Show More Results',
            item: showMoreResults(nextSearchAfter),
            index: items.length,
            isHighlighted: highlightedIndex === items.length,
          })}
        />
      ) : null}
    </div>
  ) : null
}

Results.propTypes = {
  clearItems: PropTypes.func.isRequired,
  getItemProps: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  results: PropTypes.shape({
    items: PropTypes.array.isRequired,
    totalResults: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
  }),
}

Results.defaultProps = {
  highlightedIndex: null,
  results: { items: [], totalResults: 0, searchTerm: '' },
}

export default Results
