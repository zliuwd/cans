import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from './../Rating';
import { getI18nValuesByPrefix } from './../../../utils/i18nHelper';

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
    onRatingUpdate: PropTypes.func.isRequired,
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
    })
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

  switchExpandedState = () => {
    this.setState({ isExpanded: !this.state.isExpanded })
  };

  renderQtcIfNeeded = (qtcDescriptions) => {
    return qtcDescriptions.length > 0 ? (
      <div>
        <Typography variant="headline">Questions to Consider:</Typography>
        <Typography variant="body1">
          {qtcDescriptions.map((description, i) => {
            return (<li key={i}>{description}</li>)
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
            <FormControl >
              <RadioGroup name="rating_desc" value={rating} onChange={this.handleRatingChange}>
                {has_na_option ? (<FormControlLabel
                  value={-1}
                  control={<Radio value={-1}/>}
                  label={'N/A'}
                />) : null}
                {ratingDescriptions.map((label, i) => {
                  return (<FormControlLabel
                    value={i}
                    control={<Radio value={i}/>}
                    label={`${this.getRadioValueForLabel(isBooleanRating, i)} = ${label}`}
                  />)
                })}
              </RadioGroup>
            </FormControl>
          </form>
        </Typography>
      </div>
    ) : null;
  };

  render = () => {
    const { onRatingUpdate, item } = this.props;
    const { code, rating_type, has_na_option, rating } = item;
    const { isExpanded, title, description, qtcDescriptions, ratingDescriptions } = this.state;
    const isBooleanRating = rating_type === 'BOOLEAN';
    return (
      <div>
        <AppBar position="static" color="114161">
          <Toolbar style={{'justify-content': 'space-between'}}>
            <Icon color="primary" onClick={this.switchExpandedState} style={{
              'color': '#09798e',
              'font-size': '14px',
              'margin-left': '3px'
            }}>
              {isExpanded ? 'remove_circle' : 'add_circle'}
            </Icon>
            <Typography variant="title">
              {code}. {title}
            </Typography>
            <Rating
              itemCode={code}
              rating_type={rating_type}
              hasNaOption={has_na_option}
              rating={rating}
              onRatingUpdate={onRatingUpdate}
            />
          </Toolbar>
        </AppBar>
        {isExpanded
          ? (<Paper>
            <Typography variant="headline">Item Description:</Typography>
            <Typography variant="body1">{description}</Typography>
            {this.renderQtcIfNeeded(qtcDescriptions)}
            {this.renderRatingDescriptionsIfNeeded(ratingDescriptions, isBooleanRating, rating, has_na_option)}
          </Paper>)
          : null}
      </div>
  )};
}

export default Item;
