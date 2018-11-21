import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@cwds/components'

import './style.sass'

const SearchButton = () => {
  return (
    <Link to={`/search`} id="search-link">
      <Button color="primary" className="client-search-button">
        <i className="fa fa-search" /> Client Search
      </Button>
    </Link>
  )
}
export default SearchButton
