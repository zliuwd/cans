import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import classNames from 'classnames'
import ItemNaCheckbox from './ItemNaCheckbox'
import ItemBooleanRating from './ItemBooleanRating'
import ItemRegularRating from './ItemRegularRating'
import ItemDescriptionRating from './ItemDescriptionRating'
import { UNSET_RATING, NA_RATING, isNARating } from './RatingHelper'
import { getI18nValuesByPrefix } from '../I18nHelper'
import { stringify } from '../../../util/common'
import Comment from '../../common/Comment'
import CommentIcon from '../../common/CommentIcon'
import { expandingThenScroll, itemRatingOptionsAmount } from '../../../util/assessmentAutoScroll'

const maxCommentLength = 250

const initI18nValue = i18n => ({
  title: (i18n._title_ || '').toUpperCase(),
  description: i18n._description_ || 'No Description',
  qtcDescriptions: getI18nValuesByPrefix(i18n, '_to_consider_.'),
  ratingDescriptions: getI18nValuesByPrefix(i18n, '_rating_.'),
})

/* eslint-disable camelcase */
class Item extends Component {
  constructor(props) {
    super(props)
    const i18nValues = initI18nValue(props.i18n)
    this.state = {
      isExpanded: false,
      ...i18nValues,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const i18nValues = initI18nValue(nextProps.i18n)
    this.setState({
      ...i18nValues,
    })
  }

  handleKeyCheck = event => {
    if (event.key !== 'Tab') {
      this.switchExpandedState()
    }
  }

  handleRatingChange = onChangeEvent => {
    const code = this.props.item.code
    const caregiverIndex = this.props.caregiverIndex
    const newValue = parseInt(onChangeEvent.target.value)
    this.props.onRatingUpdate(code, newValue, caregiverIndex)
  }

  handleCommentChange = comment => {
    const code = this.props.item.code
    const caregiverIndex = this.props.caregiverIndex
    this.props.onCommentUpdate(code, comment, caregiverIndex)
  }

  // once NaCheckbox is checked, the value will be change back to noRating
  handleNaValueSetting = rating => {
    let naValue
    if (isNARating(rating)) {
      naValue = UNSET_RATING
    } else {
      naValue = NA_RATING
    }
    return stringify(naValue)
  }

  handleConfidentialityChange = onChangeEvent => {
    const code = this.props.item.code
    const caregiverIndex = this.props.caregiverIndex
    const oldValue = onChangeEvent.target.value === 'true'
    this.props.onConfidentialityUpdate(code, !oldValue, caregiverIndex)
  }

  switchExpandedState = event => {
    this.setState({ isExpanded: !this.state.isExpanded })
    expandingThenScroll(event, this.state.isExpanded, itemRatingOptionsAmount(this.props.item.rating_type))
  }

  renderConfidentialCheckbox = (isConfidential, confidential_by_default) => {
    const code = this.props.item.code
    return (
      <div className={'item-confidential-block'}>
        <form autoComplete="off">
          <FormControl>
            <FormControlLabel
              onChange={this.handleConfidentialityChange}
              label={confidential_by_default ? 'Confidential' : 'Discretion Needed'}
              value={stringify(isConfidential)}
              id={`${code}Checkbox`}
              control={
                <Checkbox
                  checked={isConfidential}
                  disabled={(confidential_by_default && !this.props.canReleaseConfidentialInfo) || this.props.disabled}
                  color={'default'}
                />
              }
            />
          </FormControl>
        </form>
      </div>
    )
  }

  renderQtcIfNeeded = qtcDescriptions => {
    return qtcDescriptions.length > 0 ? (
      <div>
        <Typography variant="display1" style={{ marginTop: '1.5rem' }}>
          Questions to Consider:
        </Typography>
        <Typography variant="headline" role={'list'}>
          {qtcDescriptions.map((description, i) => {
            return <li key={i}>{description}</li>
          })}
        </Typography>
      </div>
    ) : null
  }

  render = () => {
    const { item, isAssessmentUnderSix, caregiverIndex } = this.props
    const {
      code,
      rating_type,
      has_na_option,
      rating,
      confidential: isConfidential,
      confidential_by_default,
      under_six_id,
      above_six_id,
      comment,
    } = item
    const itemNumber = isAssessmentUnderSix ? under_six_id : above_six_id
    const { isExpanded, title, description, qtcDescriptions, ratingDescriptions } = this.state
    const isBooleanRating = rating_type === 'BOOLEAN'
    const classes = classNames('item-expand-icon', {
      'fa fa-chevron-right': !isExpanded,
      'fa fa-chevron-down': isExpanded,
    })
    const ratingProps = {
      itemCode: code,
      hasNaOption: has_na_option,
      rating,
      onRatingUpdate: this.handleRatingChange,
      disabled: this.props.disabled,
    }
    return (
      <div>
        <Paper>
          <Toolbar style={{ justifyContent: 'left' }}>
            <i
              id={`${code}-item-expand`}
              role="link"
              tabIndex={0}
              className={classes}
              onClick={this.switchExpandedState}
              onKeyDown={this.handleKeyCheck}
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
            {this.props.item.has_na_option ? (
              <ItemNaCheckbox
                rating={rating}
                handleRatingChange={this.handleRatingChange}
                naValue={this.handleNaValueSetting(rating)}
                disabled={this.props.disabled}
              />
            ) : null}
            <CommentIcon isSolid={Boolean(item.comment)} className={'item-toolbar-comment-icon'} />
            <Typography variant="title" className={'item-confidential-checkbox'}>
              {this.renderConfidentialCheckbox(isConfidential, confidential_by_default)}
            </Typography>
            {rating_type === 'REGULAR' ? (
              <ItemRegularRating {...ratingProps} />
            ) : (
              <ItemBooleanRating {...ratingProps} />
            )}
          </Toolbar>
        </Paper>
        {isExpanded ? (
          <Paper style={{ padding: '1rem 3rem' }}>
            <Typography variant="display1">Item Description:</Typography>
            <Typography variant="headline">{description}</Typography>
            {this.renderQtcIfNeeded(qtcDescriptions)}
            {ratingDescriptions.length > 0 ? (
              <ItemDescriptionRating
                code={code}
                ratingDescriptions={ratingDescriptions}
                isBooleanRating={isBooleanRating}
                rating={rating}
                hasNaOption={has_na_option}
                handleRatingChange={this.handleRatingChange}
                disabled={this.props.disabled}
              />
            ) : null}
            <Comment
              id={code}
              comment={comment}
              onChange={this.handleCommentChange}
              prefix={'item-comment'}
              maxCommentLength={maxCommentLength}
              disabled={this.props.disabled}
            />
          </Paper>
        ) : null}
      </div>
    )
  }
}
/* eslint-enable camelcase */

Item.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool.isRequired,
  caregiverIndex: PropTypes.string,
  disabled: PropTypes.bool,
  i18n: PropTypes.object.isRequired,
  isAssessmentUnderSix: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
  onConfidentialityUpdate: PropTypes.func.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
}

Item.defaultProps = {
  caregiverIndex: undefined,
  disabled: false,
}
export default Item
