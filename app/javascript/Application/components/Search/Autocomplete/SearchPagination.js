import React, { Component } from 'react'
import PropTypes from 'prop-types'

const NUM_RESULTS_PER_PAGE = 10

class SearchPagination extends Component {
  constructor(props) {
    super(props)

    this.totalPages = this.calculateTotalPages(this.props.totalResults, NUM_RESULTS_PER_PAGE)
    this.state = {
      pagination: {
        totalPages: this.totalPages,
      },
    }
    this.getPrevPage = this.getPrevPage.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
  }
  calculateTotalPages(totalResults, numResultsPerPage) {
    const totalPages =
      totalResults % numResultsPerPage === 0
        ? totalResults / numResultsPerPage
        : Math.floor(totalResults / numResultsPerPage) + 1

    return totalPages
  }
  getPrevPage() {
    this.props.changePage('prev')
  }
  getNextPage() {
    this.props.changePage('next')
  }
  render() {
    const { pagination } = this.state
    const { totalPages } = pagination
    const { isDisabled, page } = this.props

    return totalPages > 0 ? (
      <div className="suggestion-footer">
        <div className="pagination-wrapper">
          <button
            className="prev-page"
            aria-label="Previous"
            onClick={this.getPrevPage}
            disabled={Boolean(page <= 1 || isDisabled)}
          >
            <i className="fa fa-caret-left" />
          </button>
          <input className="current-page-number" disabled={isDisabled} readOnly={true} type="text" value={page} />
          <div className="total-pages-wrapper">
            of <span className="total-pages">{totalPages}</span>
          </div>
          <button
            className="next-page"
            aria-label="Next"
            onClick={this.getNextPage}
            disabled={Boolean(page === totalPages || isDisabled)}
          >
            <i className="fa fa-caret-right" />
          </button>
        </div>
      </div>
    ) : null
  }
}

SearchPagination.propTypes = {
  changePage: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
}

export default SearchPagination
