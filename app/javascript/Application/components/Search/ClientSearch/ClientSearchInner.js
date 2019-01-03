import React from 'react'
import PropTypes from 'prop-types'
import QueryInput from './QueryInput'
import QueryResults from './QueryResults'

class ClientSearchInner extends React.PureComponent {
  onInputChange = ({ target: { value } }) => {
    this.props.onQueryChange({ searchTerm: value })
  }

  render() {
    const {
      clearItems,
      fetch,
      getInputProps,
      getItemProps,
      getLabelProps,
      highlightedIndex,
      isOpen,
      labelText,
      openMenu,
      query,
      searchAfter,
      selectedItem,
    } = this.props
    return (
      <React.Fragment>
        <label {...getLabelProps()}>{labelText}</label>
        <QueryInput {...getInputProps({ onChange: this.onInputChange })} openMenu={openMenu} />
        <QueryResults
          clearItems={clearItems}
          fetch={fetch}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          isOpen={isOpen}
          searchAfter={searchAfter}
          selectedItem={selectedItem}
          query={query}
        />
      </React.Fragment>
    )
  }
}

ClientSearchInner.propTypes = {
  clearItems: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
  getItemProps: PropTypes.func.isRequired,
  getLabelProps: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  query: PropTypes.any.isRequired,
  searchAfter: PropTypes.array,
  selectedItem: PropTypes.object,
}

ClientSearchInner.defaultProps = {
  highlightedIndex: null,
  searchAfter: null,
  selectedItem: null,
}

export default ClientSearchInner
