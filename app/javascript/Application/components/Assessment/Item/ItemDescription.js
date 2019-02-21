import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ItemQtcDescriptions from './ItemQtcDescriptions'
import ItemDescriptionRating from './ItemDescriptionRating'
import Comment from '../../common/Comment'
import BottomCollapseIcon from '../BottomCollapseIcon'
import './style.sass'

const ItemDescription = props => {
  const {
    description,
    qtcDescriptions,
    code,
    ratingDescriptions,
    isBooleanRating,
    rating,
    hasNaOption,
    handleRatingChange,
    disabled,
    comment,
    handleCommentChange,
    maxCommentLength,
    itemBottomCollapseClick,
  } = props
  return (
    <Paper style={{ padding: '1rem 3rem' }}>
      <Typography variant="display1">Item Description:</Typography>
      <Typography variant="headline">{description}</Typography>
      {qtcDescriptions.length > 0 ? <ItemQtcDescriptions qtcDescriptions={qtcDescriptions} /> : null}
      {ratingDescriptions.length > 0 ? (
        <ItemDescriptionRating
          code={code}
          ratingDescriptions={ratingDescriptions}
          isBooleanRating={isBooleanRating}
          rating={rating}
          hasNaOption={hasNaOption}
          handleRatingChange={handleRatingChange}
          disabled={props.disabled}
        />
      ) : null}
      <Comment
        id={code}
        comment={comment}
        onChange={handleCommentChange}
        prefix={'item-comment'}
        maxCommentLength={maxCommentLength}
        disabled={disabled}
      />
      <div className={'item-inner-collapse-icon-container'}>
        <BottomCollapseIcon code={code} onClick={itemBottomCollapseClick} />
      </div>
    </Paper>
  )
}

ItemDescription.propTypes = {
  code: PropTypes.string.isRequired,
  comment: PropTypes.string,
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleCommentChange: PropTypes.func.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  hasNaOption: PropTypes.bool.isRequired,
  isBooleanRating: PropTypes.bool.isRequired,
  itemBottomCollapseClick: PropTypes.func.isRequired,
  maxCommentLength: PropTypes.number.isRequired,
  qtcDescriptions: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
  ratingDescriptions: PropTypes.array.isRequired,
}

ItemDescription.defaultProps = {
  disabled: false,
  comment: '',
}

export default ItemDescription
