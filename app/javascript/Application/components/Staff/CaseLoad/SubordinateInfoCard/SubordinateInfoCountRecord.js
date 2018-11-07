import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'

const SubordinateInfoCountRecord = ({ caption, value }) => (
  <div className={'info-record'}>
    <div className={'info-record-caption'}>{caption}:</div>
    <div className={'info-record-value'}>{value}</div>
  </div>
)

SubordinateInfoCountRecord.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default SubordinateInfoCountRecord
