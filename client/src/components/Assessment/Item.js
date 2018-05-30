import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Rating } from './';
import { getI18nValuesByPrefix } from './I18nHelper';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      title: '',
      description: '',
      qtcDescriptions: [],
      ratingDescriptions: [],
    };
  }

  static propTypes = {
    key: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
    assessmentUnderSix: PropTypes.bool.isRequired,
    onRatingUpdate: PropTypes.func.isRequired,
    onConfidentialityUpdate: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { i18n } = nextProps;
    const title = (i18n['_title_'] || '').toUpperCase();
    const description = i18n['_description_'] || 'No Description';
    const qtcDescriptions = getI18nValuesByPrefix(i18n, '_to_consider_.');
    const ratingDescriptions = getI18nValuesByPrefix(i18n, '_rating_.');
    this.setState({
      title: title,
      description: description,
      qtcDescriptions: qtcDescriptions,
      ratingDescriptions: ratingDescriptions,
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
    const newValue = onChangeEvent.target.value;
    this.props.onRatingUpdate(code, newValue);
  };

  handleConfidentialityChange = onChangeEvent => {
    const code = this.props.item.code;
    const oldValue = onChangeEvent.target.value === 'true';
    this.props.onConfidentialityUpdate(code, !oldValue);
  };

  switchExpandedState = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  renderConfidentialCheckbox = isConfidential => {
    return (
      <div>
        <form autoComplete="off">
          <FormControl>
            <FormControlLabel
              onChange={this.handleConfidentialityChange}
              label={'Confidential'}
              value={isConfidential}
              control={<Checkbox checked={isConfidential} />}
            />
          </FormControl>
        </form>
      </div>
    );
  };

  renderQtcIfNeeded = qtcDescriptions => {
    return qtcDescriptions.length > 0 ? (
      <div>
        <Typography variant="headline">Questions to Consider:</Typography>
        <Typography variant="body1">
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
        <Typography variant="headline">Ratings:</Typography>
        <Typography variant="body1">
          <form autoComplete="off">
            <FormControl>
              <RadioGroup name="rating_desc" value={rating} onChange={this.handleRatingChange}>
                {has_na_option ? <FormControlLabel value={8} control={<Radio value={8} />} label={'N/A'} /> : null}
                {ratingDescriptions.map((label, i) => {
                  return (
                    <FormControlLabel
                      value={i}
                      control={<Radio value={i} />}
                      label={`${this.getRadioValueForLabel(isBooleanRating, i)} = ${label}`}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </form>
        </Typography>
      </div>
    ) : null;
  };

  render = () => {
    const { item, assessmentUnderSix, onRatingUpdate } = this.props;
    const { code, rating_type, has_na_option, rating, confidential, under_six_id, above_six_id } = item;
    const itemNumber = assessmentUnderSix ? under_six_id : above_six_id;
    const { isExpanded, title, description, qtcDescriptions, ratingDescriptions } = this.state;
    const isBooleanRating = rating_type === 'BOOLEAN';
    return (assessmentUnderSix && under_six_id) || (!assessmentUnderSix && above_six_id) ? (
      <div>
        <AppBar position="static" color="114161">
          <Toolbar style={{ 'justify-content': 'space-between' }}>
            <Icon
              color="primary"
              onClick={this.switchExpandedState}
              style={{
                color: '#09798e',
                'font-size': '14px',
                'margin-left': '3px',
              }}
            >
              {isExpanded ? 'remove_circle' : 'add_circle'}
            </Icon>
            <Typography variant="title">
              {itemNumber}. {title}
            </Typography>
            {this.renderConfidentialCheckbox(confidential)}
            <Rating
              itemCode={code}
              rating_type={rating_type}
              hasNaOption={has_na_option}
              rating={rating}
              onRatingUpdate={onRatingUpdate}
            />
          </Toolbar>
        </AppBar>
        {isExpanded ? (
          <Paper>
            <Typography variant="headline">Item Description:</Typography>
            <Typography variant="body1">{description}</Typography>
            {this.renderQtcIfNeeded(qtcDescriptions)}
            {this.renderRatingDescriptionsIfNeeded(ratingDescriptions, isBooleanRating, rating, has_na_option)}
          </Paper>
        ) : null}
      </div>
    ) : null;
  };
}

export default Item;
