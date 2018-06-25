import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Item } from './';
import { getI18nByCode } from './I18nHelper';

import './style.sass'

class Domain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  static propTypes = {
    key: PropTypes.string.isRequired,
    domain: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
    i18nAll: PropTypes.object.isRequired,
    assessmentUnderSix: PropTypes.bool.isRequired,
    onRatingUpdate: PropTypes.func.isRequired,
    onConfidentialityUpdate: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { i18n } = nextProps;
    const title = (i18n['_title_'] || '').toUpperCase();
    const description = i18n['_description_'] || '';
    this.setState({
      title: title,
      description: description,
    });
  }

  renderItems = items => {
    const i18nAll = this.props.i18nAll || {};
    const { assessmentUnderSix, onRatingUpdate, onConfidentialityUpdate } = this.props;
    return items.map(item => {
      const code = item.code;
      const itemI18n = getI18nByCode(i18nAll, code);
      return (
        <div>
          <Item
            key={code}
            item={item}
            i18n={itemI18n}
            onRatingUpdate={onRatingUpdate}
            onConfidentialityUpdate={onConfidentialityUpdate}
            assessmentUnderSix={assessmentUnderSix}
          />
          <Divider />
        </div>
      );
    });
  };

  render = () => {
    const { assessmentUnderSix } = this.props;
    const { items, under_six, above_six } = this.props.domain;
    const { title, description } = this.state;
    return (assessmentUnderSix && under_six) || (!assessmentUnderSix && above_six) ? (
      <ExpansionPanel style={{ 'background-color': '#114161' }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon style={{ height: '28px', color: 'white' }} />}
          style={{ 'min-height': '28px' }}
        >
          <Typography variant="title" style={{ color: 'white' }}>
            {title}
          </Typography>
          {description ? (
            <Tooltip title={description} placement="top-end"
                     classes={{popper: 'domain-tooltip'}}>
              <i className="fa fa-question-circle domain-help-icon"></i>
            </Tooltip>
          ) : null}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'block', padding: '0' }}>
          {this.renderItems(items)}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ) : null;
  };
}

export default Domain;
