import React from 'react'
import PropTypes from 'prop-types'
import ItemNaCheckbox from './ItemNaCheckbox'
import ItemBooleanRating from './ItemBooleanRating'
import ItemRegularRating from './ItemRegularRating'
import CommentIcon from '../../common/CommentIcon'
import ConfidentialCheckbox from './ConfidentialCheckbox'
import Typography from '@material-ui/core/Typography'

const ItemToolbarControls = props => {
  const {
    hasNaOption,
    rating,
    onRatingUpdate,
    disabled,
    isConfidential,
    isConfidentialByDefault,
    code,
    canReleaseConfidentialInfo,
    handleConfidentialityChange,
    handleNaValueSetting,
    comment,
    ratingType,
  } = props

  const ratingProps = {
    itemCode: code,
    hasNaOption,
    rating,
    onRatingUpdate,
    disabled,
  }

  const confidentialCheckboxProps = {
    isConfidential,
    isConfidentialByDefault,
    code,
    canReleaseConfidentialInfo,
    disabled,
    handleConfidentialityChange,
  }

  return (
    <React.Fragment>
      {hasNaOption ? (
        <ItemNaCheckbox
          rating={rating}
          handleRatingChange={onRatingUpdate}
          naValue={handleNaValueSetting(rating)}
          disabled={disabled}
        />
      ) : null}
      <CommentIcon isSolid={Boolean(comment)} className={'item-toolbar-comment-icon'} />
      <Typography variant="body2" className={'item-confidential-checkbox'}>
        <ConfidentialCheckbox {...confidentialCheckboxProps} />
      </Typography>
      {ratingType === 'REGULAR' ? <ItemRegularRating {...ratingProps} /> : <ItemBooleanRating {...ratingProps} />}
    </React.Fragment>
  )
}

ItemToolbarControls.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
  comment: PropTypes.string,
  disabled: PropTypes.bool,
  handleConfidentialityChange: PropTypes.func.isRequired,
  handleNaValueSetting: PropTypes.func.isRequired,
  hasNaOption: PropTypes.bool.isRequired,
  isConfidential: PropTypes.bool.isRequired,
  isConfidentialByDefault: PropTypes.bool.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  ratingType: PropTypes.string.isRequired,
}

ItemToolbarControls.defaultProps = {
  disabled: false,
  comment: '',
}

export default ItemToolbarControls
