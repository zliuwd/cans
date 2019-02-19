import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from '../../../../../util/common'

const AkaInfo = ({ aka }) => {
  return !isEmpty(aka) ? (
    <div className="aka-info">
      <div className="search-item-header">{aka.name_type}</div>
      <div className="search-item">{`${aka.first_name || ''} ${aka.last_name || ''}`}</div>
    </div>
  ) : (
    ''
  )
}
AkaInfo.defaultProps = {
  aka: {},
}
AkaInfo.propTypes = {
  aka: PropTypes.shape({
    name_type: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
}

export default AkaInfo
