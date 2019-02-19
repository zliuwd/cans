import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const ItemHeader = props => {
  const { code, classes, onClick, onKeyDown, itemNumber, caregiverIndex, title } = props
  return (
    <React.Fragment>
      <i
        id={`${code}-item-expand`}
        role="link"
        tabIndex={0}
        className={classes}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
      <Typography
        variant="title"
        style={{
          flex: 1,
          textAlign: 'left',
          marginLeft: 10,
        }}
      >
        {itemNumber}
        {caregiverIndex}. {title}
      </Typography>
    </React.Fragment>
  )
}

ItemHeader.propTypes = {
  caregiverIndex: PropTypes.string,
  classes: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  itemNumber: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

ItemHeader.defaultProps = {
  caregiverIndex: '',
}

export default ItemHeader
