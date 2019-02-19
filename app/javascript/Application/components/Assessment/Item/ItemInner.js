import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import ItemToolbarControls from './ItemToolbarControls'
import ItemHeader from './ItemHeader'
import ItemDescription from './ItemDescription'

const ItemInner = props => {
  const itemHeaderProps = {
    code: props.code,
    classes: props.classes,
    onClick: props.switchExpandedState,
    onKeyDown: props.handleKeyCheck,
    itemNumber: props.itemNumber,
    caregiverIndex: props.caregiverIndex,
    title: props.title,
  }
  const toolbarControlsProps = {
    itemCode: props.code,
    hasNaOption: props.has_na_option,
    rating: props.rating,
    onRatingUpdate: props.handleRatingChange,
    disabled: props.disabled,
    isConfidential: props.isConfidential,
    isConfidentialByDefault: props.confidential_by_default,
    code: props.code,
    canReleaseConfidentialInfo: props.canReleaseConfidentialInfo,
    handleConfidentialityChange: props.handleConfidentialityChange,
    handleNaValueSetting: props.handleNaValueSetting,
    comment: props.comment,
    ratingType: props.rating_type,
  }

  const itemDescriptionProps = {
    description: props.description,
    qtcDescriptions: props.qtcDescriptions,
    code: props.code,
    ratingDescriptions: props.ratingDescriptions,
    isBooleanRating: props.isBooleanRating,
    rating: props.rating,
    hasNaOption: props.has_na_option,
    handleRatingChange: props.handleRatingChange,
    disabled: props.disabled,
    comment: props.comment,
    handleCommentChange: props.handleCommentChange,
    maxCommentLength: props.maxCommentLength,
  }

  return (
    <div>
      <Paper>
        <Toolbar style={{ justifyContent: 'left' }}>
          <ItemHeader {...itemHeaderProps} />
          <ItemToolbarControls {...toolbarControlsProps} />
        </Toolbar>
      </Paper>
      {props.isExpanded ? <ItemDescription {...itemDescriptionProps} /> : null}
    </div>
  )
}

ItemInner.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool.isRequired,
  caregiverIndex: PropTypes.string,
  classes: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  comment: PropTypes.string,
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleCommentChange: PropTypes.func.isRequired,
  handleConfidentialityChange: PropTypes.func.isRequired,
  handleNaValueSetting: PropTypes.func.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  hasNaOption: PropTypes.bool,
  isBooleanRating: PropTypes.bool.isRequired,
  isConfidential: PropTypes.bool.isRequired,
  isConfidentialByDefault: PropTypes.bool,
  itemNumber: PropTypes.string.isRequired,
  maxCommentLength: PropTypes.number.isRequired,
  qtcDescriptions: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
  ratingDescriptions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

ItemInner.defaultProps = {
  isConfidentialByDefault: undefined,
  hasNaOption: undefined,
  caregiverIndex: '',
  disabled: false,
  comment: '',
}

export default ItemInner
