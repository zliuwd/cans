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

const boolRating = ['No', 'Yes']

const ItemBooleanRating = props => {
  const code = props.itemCode
  const labelId = `${code}-outer-controls-label`
  const radioButtons = boolRating.map((label, i) => {
    return (
      <FormControlLabel
        id={`label-${code}-${i}`}
        style={ieFixStyle.label}
        key={`bool-${i}`}
        value={stringify(i)}
        disabled={props.rating === 8}
        control={
          <PrimRadio
            inputProps={{
              id: `input-${code}-bool-${i}`,
              'aria-label': labelId,
            }}
          />
        }
        label={`${label}`}
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
            id={`${code}-bool-rating`}
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

ItemBooleanRating.propTypes = {
  itemCode: PropTypes.string.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
}

export default ItemBooleanRating
