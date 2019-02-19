import React from 'react'
import PropTypes from 'prop-types'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { stringify } from '../../../util/common'
import { withStyles } from '@material-ui/core/styles'
import { ieStyleFixer } from './ItemStyling'
import { isNARating } from './ItemHelper'

const ieFixStyle = ieStyleFixer()

const PrimRadio = withStyles({
  root: ieFixStyle.radio,
  checked: {},
  disabled: {},
})(Radio)

const ItemRating = props => {
  const code = props.itemCode
  const labelId = `${code}-outer-controls-label`
  const radioButtons = props.options.map((label, i) => (
    <FormControlLabel
      id={`label-${code}-${i}`}
      style={ieFixStyle.label}
      key={`rating-${i}`}
      value={stringify(i)}
      control={
        <PrimRadio
          inputProps={{
            id: `input-${code}-${props.type}-${i}`,
            'aria-label': labelId, // TODO - should be aria-labelled-by?
          }}
        />
      }
      label={label}
      labelPlacement={'start'}
    />
  ))
  return (
    <div className={`item-${props.shortType}-rating`} style={{ display: 'flex' }}>
      <form autoComplete="off">
        <FormControl
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            height: '8px',
          }}
          disabled={isNARating(props.rating) || props.disabled}
        >
          <RadioGroup
            id={`${code}-${props.type}-rating`}
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

ItemRating.propTypes = {
  disabled: PropTypes.bool,
  itemCode: PropTypes.string.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
  shortType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

ItemRating.defaultProps = {
  disabled: false,
}

export default ItemRating
