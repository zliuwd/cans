import React from 'react'
import PropTypes from 'prop-types'
import Icon from '@cwds/icons'
import Typography from '@material-ui/core/Typography'

const ROTATION_RIGHT = 270

const ItemHeader = props => {
  const { code, onClick, onKeyDown, isExpanded, itemNumber, caregiverIndex, title } = props
  return (
    <React.Fragment>
      <Icon
        id={`${code}-item-expand`}
        role="link"
        tabIndex={0}
        icon="chevron-down"
        rotation={isExpanded ? null : ROTATION_RIGHT}
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
  code: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  itemNumber: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

ItemHeader.defaultProps = {
  caregiverIndex: '',
}

export default ItemHeader
