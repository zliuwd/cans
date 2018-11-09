import React from 'react'
import PropTypes from 'prop-types'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { stringify } from '../../util/common'
import { withStyles } from '@material-ui/core/styles'
import { ieStyleFixer } from './ItemStyling'

const ieFixStyle = ieStyleFixer()

const PrimRadio = withStyles({
  root: ieFixStyle.radio,
  checked: {},
})(Radio)

const regularRating = 4

const ItemRegularRating = props => {
  const code = props.itemCode
  const labelId = `${code}-outer-controls-label`
  const radioButtons = Array.from({ length: regularRating }).map((n, i) => {
    return (
      <FormControlLabel
        style={ieFixStyle.label}
        key={`reg-${i}`}
        value={stringify(i)}
        disabled={props.rating === 8}
        control={
          <PrimRadio
            inputProps={{
              id: `input-${code}-regular-${i}`,
              'aria-label': labelId,
            }}
          />
        }
        label={`${i}`}
        labelPlacement={'start'}
      />
    )
  })
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <form autoComplete="off">
        <FormControl
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            height: '8px',
          }}
        >
          <RadioGroup
            id={`${code}-regular-rating`}
            value={stringify(props.rating)}
            onChange={props.onRatingUpdate}
            style={{ flexWrap: 'nowrap', flexDirection: 'row' }}
          >
            {radioButtons}
          </RadioGroup>
        </FormControl>
      </form>
    </div>
  )
}

ItemRegularRating.propTypes = {
  itemCode: PropTypes.string.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
}

export default ItemRegularRating
