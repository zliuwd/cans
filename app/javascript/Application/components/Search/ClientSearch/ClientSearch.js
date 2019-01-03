import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import ClientSearchInner from './ClientSearchInner'
import { isAction, isShowMoreResults } from './SearchActions'

class ClientSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      searchAfter: null,
      query: {
        searchTerm: '',
      },
    }
  }

  onStateChange = ({ isOpen }) => {
    if (isOpen !== undefined) {
      this.setState({ isOpen })
    }

    if (this.state.query.searchTerm === '') {
      this.setState({ isOpen: false })
    }
  }

  onQueryChange = query => {
    this.setState({ query, searchAfter: null })
    if (query.searchTerm === '') {
      this.setState({ isOpen: false })
    }
  }

  onSelect = item => {
    if (isAction(item)) {
      this.performAction(item)
      this.setState({ isOpen: true })
    } else {
      this.props.onSelect(item)
    }
  }

  performAction = action => {
    if (isShowMoreResults(action)) {
      this.setState({ searchAfter: action.searchAfter })
    }
  }

  renderChildren = ({
    clearItems,
    getInputProps,
    getItemProps,
    getLabelProps,
    highlightedIndex,
    isOpen,
    openMenu,
    selectedItem,
  }) => {
    const { fetch, labelText } = this.props
    const { searchAfter, query } = this.state

    return (
      <div>
        <ClientSearchInner
          clearItems={clearItems}
          fetch={fetch}
          getInputProps={getInputProps}
          getItemProps={getItemProps}
          getLabelProps={getLabelProps}
          highlightedIndex={highlightedIndex}
          isOpen={isOpen}
          labelText={labelText}
          onQueryChange={this.onQueryChange}
          openMenu={openMenu}
          query={query}
          searchAfter={searchAfter}
          selectedItem={selectedItem}
        />
      </div>
    )
  }

  render() {
    return (
      <Downshift
        itemToString={JSON.stringify}
        onSelect={this.onSelect}
        onStateChange={this.onStateChange}
        isOpen={this.state.isOpen}
      >
        {this.renderChildren}
      </Downshift>
    )
  }
}

ClientSearch.propTypes = {
  fetch: PropTypes.func,
  labelText: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
}

ClientSearch.defaultProps = {
  fetch: () => {},
  labelText: 'Search for clients',
}

export default ClientSearch
