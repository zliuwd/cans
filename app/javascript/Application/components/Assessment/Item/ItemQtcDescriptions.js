import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
const ItemQtcDescriptions = ({ qtcDescriptions }) => {
  return (
    <div>
      <Typography variant="display1" style={{ marginTop: '1.5rem' }}>
        Questions to Consider:
      </Typography>
      <Typography variant="headline" role={'list'}>
        {qtcDescriptions.map((description, i) => {
          return <li key={i}>{description}</li>
        })}
      </Typography>
    </div>
  )
}

ItemQtcDescriptions.propTypes = {
  qtcDescriptions: PropTypes.array.isRequired,
}

export default ItemQtcDescriptions
