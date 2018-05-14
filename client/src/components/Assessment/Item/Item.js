import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Rating from './../Rating';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  static propTypes = {
    key: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
    onRatingUpdate: PropTypes.func.isRequired,
  };

  switchExpandedState = () => {
    this.setState({ isExpanded: !this.state.isExpanded })
  };

  render = () => {
    const { onRatingUpdate, item, i18n } = this.props;
    const { code, rating_type, rating } = item;
    const hasNAValue = rating_type === 'REGULAR_WITH_NA' || rating_type === 'BOOLEAN_WITH_NA';
    const title = i18n['_title_'] || 'Untitled';
    const description = i18n['_description_'] || 'No Description';
    const { isExpanded } = this.state;
    return (
      <div>
        <AppBar position="static" color="114161">
          <Toolbar style={{'justify-content': 'space-between'}}>
            <Icon color="primary" onClick={this.switchExpandedState} style={{
              'color': '#09798e',
              'font-size': '14px',
              'margin-left': '3px'
            }}>
              { isExpanded ? 'remove_circle' : 'add_circle' }
            </Icon>
            <Typography variant="title">
              {title}
            </Typography>
            <Rating
              itemCode={code}
              rating_type={rating_type}
              hasNAValue={hasNAValue}
              rating={rating}
              onRatingUpdate={onRatingUpdate}
            />
          </Toolbar>
        </AppBar>
        {isExpanded
          ? (<Paper>
            <Typography variant="headline">
              Item Description:
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </Paper>)
          : null}
      </div>
  )};
}

export default Item;
