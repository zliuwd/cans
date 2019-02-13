import React from 'react'
import PropTypes from 'prop-types'
import { Button, CardHeader, CardTitle } from '@cwds/components'
import './style.sass'

const DomainsHeader = props => {
  const { isUnderSix, isDefaultExpanded, expandCollapse } = props
  return (
    <CardHeader className="domains-expand-collapse-header">
      <CardTitle className="assessment-card-title">
        <span className={'domains-expand-collapse-age-range'}>{isUnderSix ? 'Age Range 0-5' : 'Age Range 6-21'}</span>
        <Button color="link" className={'domains-expand-collapse-button-right'} onClick={expandCollapse}>
          {isDefaultExpanded ? 'Collapse All' : 'Expand All'}
        </Button>
      </CardTitle>
    </CardHeader>
  )
}
DomainsHeader.propTypes = {
  expandCollapse: PropTypes.func,
  isDefaultExpanded: PropTypes.bool,
  isUnderSix: PropTypes.bool.isRequired,
}
DomainsHeader.defaultProps = {
  expandCollapse: () => {},
  isDefaultExpanded: false,
}

export default DomainsHeader
