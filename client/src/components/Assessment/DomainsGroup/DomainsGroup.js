import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Domain } from './..';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getI18nByCode} from "../../../utils/i18nHelper";

class DomainsGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  static propTypes = {
    key: PropTypes.string.isRequired,
    domainsGroup: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
    i18nAll: PropTypes.object.isRequired,
    assessmentUnderSix: PropTypes.bool.isRequired,
    onRatingUpdate: PropTypes.func.isRequired,
    onConfidentialityUpdate: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { i18n } = nextProps;
    const title = (i18n['_title_'] || '').toUpperCase();
    const description = i18n['_description_'] || 'No Description';
    this.setState({
      title: title,
      description: description,
    })
  }

  renderDomains = domains => {
    const i18nAll = this.props.i18nAll || {};
    const { onRatingUpdate, onConfidentialityUpdate, assessmentUnderSix } = this.props;
    return domains.map(domain => {
      const code = domain.code;
      const domainI18n = getI18nByCode(i18nAll, code);
      return (
        <div>
          <Divider/>
          <Domain key={code}
                  domain={domain}
                  i18n={domainI18n}
                  i18nAll={i18nAll}
                  assessmentUnderSix={assessmentUnderSix}
                  onRatingUpdate={onRatingUpdate}
                  onConfidentialityUpdate={onConfidentialityUpdate}/>
        </div>
      )
    });
  };

  render = () => {
    const { title, description } = this.state;
    const { domains } = this.props.domainsGroup;
    return (
      <ExpansionPanel style={{ 'background-color': '#114161' }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon style={{ 'height': '28px', 'color': 'white' }} />}
          style={{ 'min-height': '28px' }}>
          <Typography variant="title" style={{ 'color': 'white' }}>
            {title}
          </Typography>
          {description ? (
            <Tooltip title={description} placement="top-end">
              <i className="material-icons" style={{
                'color': '#09798e',
                'font-size': '14px',
                'margin-left': '3px'
              }}>help</i>
            </Tooltip>
          ) : null}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display: 'block', padding: '0'}}>
          { this.renderDomains(domains) }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };
}

export default DomainsGroup;
