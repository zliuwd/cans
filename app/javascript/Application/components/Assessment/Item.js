import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'classnames';
import { shouldItemBeRendered } from './AssessmentHelper';
import { Rating } from './';
import { getI18nValuesByPrefix } from './I18nHelper';
import { stringify } from '../../util/common';

const initI18nValue = i18n => ({
  title: (i18n['_title_'] || '').toUpperCase(),
  description: i18n['_description_'] || 'No Description',
  qtcDescriptions: getI18nValuesByPrefix(i18n, '_to_consider_.'),
  ratingDescriptions: getI18nValuesByPrefix(i18n, '_rating_.'),
});

/* eslint-disable camelcase */
class Item extends Component {
  constructor(props) {
    super(props);
    const i18nValues = initI18nValue(props.i18n);
    this.state = {
      isExpanded: false,
      ...i18nValues,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const i18nValues = initI18nValue(nextProps.i18n);
    this.setState({
      ...i18nValues,
    });
  }

  getRadioValueForLabel = (isBooleanRating, index) => {
    if (!isBooleanRating) {
      return index;
    }
    if (index === 0) {
      return 'No';
    }
    if (index === 1) {
      return 'Yes';
    }
    return index;
  };

  handleRatingChange = onChangeEvent => {
    const code = this.props.item.code;
    const caregiverIndex = this.props.caregiverIndex;
    const newValue = parseInt(onChangeEvent.target.value);
    this.props.onRatingUpdate(code, newValue, caregiverIndex);
  };

  handleConfidentialityChange = onChangeEvent => {
    const code = this.props.item.code;
    const caregiverIndex = this.props.caregiverIndex;
    const oldValue = onChangeEvent.target.value === 'true';
    this.props.onConfidentialityUpdate(code, !oldValue, caregiverIndex);
  };

  switchExpandedState = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  renderConfidentialCheckbox = (isConfidential, confidential_by_default) => {
    return (
      <div>
        <form autoComplete="off">
          <FormControl>
            <FormControlLabel
              onChange={this.handleConfidentialityChange}
              label={'Confidential'}
              value={stringify(isConfidential)}
              control={
                <Checkbox
                  checked={isConfidential}
                  disabled={confidential_by_default && !this.props.canReleaseConfidentialInfo}
                  color={'default'}
                />
              }
            />
          </FormControl>
        </form>
      </div>
    );
  };

  renderQtcIfNeeded = qtcDescriptions => {
    return qtcDescriptions.length > 0 ? (
      <div>
        <Typography variant="display1" style={{ marginTop: '1.5rem' }}>
          Questions to Consider:
        </Typography>
        <Typography variant="headline">
          {qtcDescriptions.map((description, i) => {
            return <li key={i}>{description}</li>;
          })}
        </Typography>
      </div>
    ) : null;
  };

  renderRatingDescriptionsIfNeeded = (ratingDescriptions, isBooleanRating, rating, has_na_option) => {
    return ratingDescriptions.length > 0 ? (
      <div>
        <Typography variant="display1" style={{ marginTop: '1.5rem' }}>
          Ratings:
        </Typography>
        <form autoComplete="off">
          <FormControl>
            <RadioGroup name="rating_desc" value={stringify(rating)} onChange={this.handleRatingChange}>
              {has_na_option ? (
                <FormControlLabel
                  value={stringify(8)}
                  control={<Radio value={stringify(8)} color={'default'} />}
                  label={<Typography variant="headline">N/A</Typography>}
                  style={{ fontSize: '1.3rem' }}
                />
              ) : null}
              {ratingDescriptions.map((label, i) => {
                return (
                  <FormControlLabel
                    value={stringify(i)}
                    key={label}
                    control={<Radio value={stringify(i)} color={'default'} />}
                    style={{ fontSize: '1.3rem' }}
                    label={
                      <Typography variant="headline">
                        {this.getRadioValueForLabel(isBooleanRating, i)} = {label}
                      </Typography>
                    }
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </form>
      </div>
    ) : null;
  };

  render = () => {
    const { item, isAssessmentUnderSix, caregiverIndex } = this.props;
    const {
      code,
      rating_type,
      has_na_option,
      rating,
      confidential: isConfidential,
      confidential_by_default,
      under_six_id,
      above_six_id,
    } = item;
    const itemNumber = isAssessmentUnderSix ? under_six_id : above_six_id;
    const { isExpanded, title, description, qtcDescriptions, ratingDescriptions } = this.state;
    const isBooleanRating = rating_type === 'BOOLEAN';
    const classes = classNames('item-expand-icon', { 'fa fa-plus': !isExpanded, 'fa fa-minus': isExpanded });
    return shouldItemBeRendered(isAssessmentUnderSix, item) ? (
      <div>
        <AppBar position="static" color="inherit">
          <Toolbar style={{ justifyContent: 'left' }}>
            <i
              id={'item-expand'}
              role="link"
              tabIndex={0}
              className={classes}
              onClick={this.switchExpandedState}
              onKeyDown={this.switchExpandedState}
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

            <Typography variant="title" style={{ marginRight: 10 }}>
              {this.renderConfidentialCheckbox(isConfidential, confidential_by_default)}
            </Typography>
            <Typography variant="title">
              <Rating
                itemCode={code}
                rating_type={rating_type}
                hasNaOption={has_na_option}
                rating={rating}
                onRatingUpdate={this.handleRatingChange}
              />
            </Typography>
          </Toolbar>
        </AppBar>
        {isExpanded ? (
          <Paper style={{ padding: '1rem 3rem' }}>
            <Typography variant="display1">Item Description:</Typography>
            <Typography variant="headline">{description}</Typography>
            {this.renderQtcIfNeeded(qtcDescriptions)}
            {this.renderRatingDescriptionsIfNeeded(ratingDescriptions, isBooleanRating, rating, has_na_option)}
          </Paper>
        ) : null}
      </div>
    ) : null;
  };
}
/* eslint-enable camelcase */

Item.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool.isRequired,
  caregiverIndex: PropTypes.string,
  i18n: PropTypes.object.isRequired,
  isAssessmentUnderSix: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  onConfidentialityUpdate: PropTypes.func.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
};

Item.defaultProps = {
  caregiverIndex: undefined,
};
export default Item;
