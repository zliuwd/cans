import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { NA_RATING } from './ItemHelper'
import { stringify } from '../../../util/common'

const getTextPresentationForRating = (isBooleanRating, index) => {
  if (!isBooleanRating) return index
  if (index === 0) return 'No'
  if (index === 1) return 'Yes'
  return index
}

class ItemDescriptionRating extends PureComponent {
  constructor(props) {
    super()
    const ratingDescriptions = props.hasNaOption ? props.ratingDescriptions.slice(0, -1) : props.ratingDescriptions
    const naRatingDescription = props.hasNaOption
      ? props.ratingDescriptions[props.ratingDescriptions.length - 1]
      : undefined
    this.state = {
      naRatingDescription,
      ratingDescriptions,
    }
  }

  render() {
    const { code, rating, handleRatingChange, hasNaOption, isBooleanRating } = this.props
    const { naRatingDescription, ratingDescriptions } = this.state
    const labelId = `${code}-inter-controls-label`
    return (
      <Fragment>
        <Typography id={labelId} variant="subheading" style={{ marginTop: '0.9375rem' }}>
          Ratings:
        </Typography>
        <form autoComplete="off">
          <FormControl className={'item-form-control'} disabled={this.props.disabled}>
            <RadioGroup name="rating_desc" value={stringify(rating)} onChange={handleRatingChange}>
              {hasNaOption ? (
                <FormControlLabel
                  value={stringify(NA_RATING)}
                  control={<Radio value={stringify(NA_RATING)} color={'default'} />}
                  label={<Typography variant="body2">N/A = {naRatingDescription}</Typography>}
                  style={{ fontSize: '0.8125rem' }}
                />
              ) : null}
              {ratingDescriptions.map((label, i) => {
                return (
                  <FormControlLabel
                    value={stringify(i)}
                    key={label}
                    id={`input-${code}-${i}-select`}
                    control={
                      <Radio
                        value={stringify(i)}
                        color={'default'}
                        inputProps={{
                          id: `input-${code}-${i}`,
                          'aria-labelledby': labelId,
                        }}
                      />
                    }
                    style={{ fontSize: '0.8125rem' }}
                    label={
                      <Typography variant="body2">
                        {getTextPresentationForRating(isBooleanRating, i)} = {label}
                      </Typography>
                    }
                  />
                )
              })}
            </RadioGroup>
          </FormControl>
        </form>
      </Fragment>
    )
  }
}

ItemDescriptionRating.propTypes = {
  code: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleRatingChange: PropTypes.func.isRequired,
  hasNaOption: PropTypes.bool.isRequired,
  isBooleanRating: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  ratingDescriptions: PropTypes.array.isRequired,
}

ItemDescriptionRating.defaultProps = {
  disabled: false,
}

export default ItemDescriptionRating
