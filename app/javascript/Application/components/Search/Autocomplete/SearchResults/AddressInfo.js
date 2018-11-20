import PropTypes from 'prop-types'
import React from 'react'

const AddressInfo = ({ streetAddress, city, state, zip }) => {
  const stateZip = [state, zip].filter(Boolean).join(' ')
  return (
    <div>
      <span>
        {streetAddress ? `${streetAddress} ` : ''}
        {[city, stateZip].filter(Boolean).join(', ')}
      </span>
    </div>
  )
}
AddressInfo.defaultProps = {
  city: '',
  state: '',
  streetAddress: '',
  zip: '',
}
AddressInfo.propTypes = {
  city: PropTypes.string,
  state: PropTypes.string,
  streetAddress: PropTypes.string,
  zip: PropTypes.string,
}
export default AddressInfo
