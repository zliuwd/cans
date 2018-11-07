import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'

const SubordinateInfoRecord = ({ caption, value }) => (
  <div className={'info-record'}>
    <div className={'info-record-caption'}>{caption}:</div>
    <div>{value}</div>
  </div>
)

SubordinateInfoRecord.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.string,
}

SubordinateInfoRecord.defaultProps = {
  value: '',
}

export default SubordinateInfoRecord
