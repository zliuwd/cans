import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'

const SubordinateInfoTotalRecord = ({ totalClientsCount }) => (
  <div>
    <div className={'total-clients-number'}>{totalClientsCount}</div>
    <div className={'total-clients-caption'}>Total Clients</div>
  </div>
)

SubordinateInfoTotalRecord.propTypes = {
  totalClientsCount: PropTypes.number.isRequired,
}

export default SubordinateInfoTotalRecord
