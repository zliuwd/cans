import React from 'react'
import PropTypes from 'prop-types'
import Icon from '@cwds/icons'

const ComparisonOuterTableExpander = ({ isExpanded }) => {
  return isExpanded ? (
    <Icon className={'outer-table-expander-expanded'} icon="chevron-down" size="1x" rotation={180} />
  ) : (
    <Icon className={'outer-table-expander-collapsed'} icon="chevron-down" size="1x" />
  )
}

ComparisonOuterTableExpander.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
}

export default ComparisonOuterTableExpander
