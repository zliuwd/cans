import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import { isNARating } from './RatingHelper'

const PrimCheckbox = withStyles({
  root: {
    '&$checked': {
      color: '#09798E',
    },
  },
  checked: {},
})(Checkbox)

const ItemNaCheckbox = props => {
  const isNAChecked = isNARating(props.rating)
  return (
    <Typography variant="title" style={{ marginRight: 15 }}>
      <form autoComplete="off">
        <FormControl>
          <FormControlLabel
            onChange={props.handleRatingChange}
            label={'N/A'}
            value={props.naValue}
            control={<PrimCheckbox checked={isNAChecked} disabled={props.disabled} />}
          />
        </FormControl>
      </form>
    </Typography>
  )
}

ItemNaCheckbox.propTypes = {
  disabled: PropTypes.bool,
  handleRatingChange: PropTypes.func.isRequired,
  naValue: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
}

ItemNaCheckbox.defaultProps = {
  disabled: false,
}

export default ItemNaCheckbox