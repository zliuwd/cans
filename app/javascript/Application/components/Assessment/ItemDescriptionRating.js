import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { stringify } from '../../util/common'

const ItemDescriptionRating = props => {
  const labelId = `${props.code}-inter-controls-label`
  const naRating = 8
  return (
    <React.Fragment>
      <Typography id={labelId} variant="display1" style={{ marginTop: '1.5rem' }}>
        Ratings:
      </Typography>
      <form autoComplete="off">
        <FormControl className={'item-form-control'}>
          <RadioGroup name="rating_desc" value={stringify(props.rating)} onChange={props.handleRatingChange}>
            {props.isNaOption ? (
              <FormControlLabel
                value={stringify(naRating)}
                control={<Radio value={stringify(naRating)} color={'default'} />}
                label={<Typography variant="headline">N/A</Typography>}
                style={{ fontSize: '1.3rem' }}
              />
            ) : null}
            {props.ratingDescriptions.map((label, i) => {
              return (
                <FormControlLabel
                  value={stringify(i)}
                  key={label}
                  id={`input-${props.code}-${i}-select`}
                  control={
                    <Radio
                      value={stringify(i)}
                      color={'default'}
                      inputProps={{
                        id: `input-${props.code}-${i}`,
                        'aria-labelledby': labelId,
                      }}
                    />
                  }
                  style={{ fontSize: '1.3rem' }}
                  label={
                    <Typography variant="headline">
                      {props.getRadioValueForLabel(props.isBooleanRating, i)} = {label}
                    </Typography>
                  }
                />
              )
            })}
          </RadioGroup>
        </FormControl>
      </form>
    </React.Fragment>
  )
}

ItemDescriptionRating.propTypes = {
  code: PropTypes.string.isRequired,
  getRadioValueForLabel: PropTypes.func.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  isBooleanRating: PropTypes.bool.isRequired,
  isNaOption: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  ratingDescriptions: PropTypes.array.isRequired,
}

export default ItemDescriptionRating
