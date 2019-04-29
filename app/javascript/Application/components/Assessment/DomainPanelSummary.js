import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { DomainProgressBar, DomainScore } from './'
import DomainCommentIcon from './DomainCommentIcon'
import Grid from '@material-ui/core/Grid'
import { Icon, UncontrolledTooltip } from '@cwds/components'

class DomainPanelSummary extends React.PureComponent {
  renderCaregiverName() {
    const { caregiverName, isCaregiverDomain } = this.props
    const needsWarning =
      (isCaregiverDomain && caregiverName === '') || (isCaregiverDomain && caregiverName && caregiverName.trim() === '')

    return needsWarning ? (
      <span className={'caregiver-warning-text'}> Caregiver Name is required</span>
    ) : (
      caregiverName && `- ${caregiverName}`
    )
  }

  renderInfoTip() {
    const { description, index } = this.props

    return description ? (
      <UncontrolledTooltip
        style={{
          minWidth: '32rem',
          textAlign: 'left',
          padding: '1.2rem',
          fontSize: '1rem',
          opacity: '1.5!important',
          color: '#1a1a1a',
          backgroundColor: '#ffffff',
          border: '1px solid #b3b3b3',
        }}
        target={`domain-${index}`}
        placement="top"
      >
        {description}
      </UncontrolledTooltip>
    ) : null
  }

  renderTitle() {
    const { index, isExpanded, title } = this.props
    const ROTATION_RIGHT = 270

    return (
      <Grid item xs={8}>
        <Typography variant="title" style={{ color: '#0e6f89', fontSize: 16 }}>
          <Icon
            id={`domain${index}-expand`}
            className="domain-icon"
            icon="chevron-down"
            size="lg"
            rotation={isExpanded ? null : ROTATION_RIGHT}
          />
          <span className="domain-item-margin">{title}</span>
          <Icon className="domain-help-icon text-primary" icon="info-circle" id={`domain-${index}`} />
          {this.renderInfoTip()} {this.renderCaregiverName()}
        </Typography>
      </Grid>
    )
  }

  render() {
    const { domain, index, isAssessmentUnderSix, isReviewed, totalScore } = this.props

    return (
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
        spacing={0}
        style={{ padding: 0, flexWrap: 'nowrap', flexDirection: 'row' }}
      >
        {this.renderTitle()}
        <Grid item xs={4} className={isReviewed ? 'domain-metric' : 'domain-metric-with-review'}>
          <div className="domain-toolbar-comment-icon-block">
            <DomainCommentIcon domain={domain} />
          </div>
          <DomainProgressBar isAssessmentUnderSix={isAssessmentUnderSix} domain={domain} />
          <DomainScore totalScore={totalScore} key={index} />
        </Grid>
      </Grid>
    )
  }
}

DomainPanelSummary.propTypes = {
  caregiverName: PropTypes.string,
  description: PropTypes.string,
  domain: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isAssessmentUnderSix: PropTypes.bool.isRequired,
  isCaregiverDomain: PropTypes.bool,
  isExpanded: PropTypes.bool.isRequired,
  isReviewed: PropTypes.bool.isRequired,
  title: PropTypes.string,
  totalScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

DomainPanelSummary.defaultProps = {
  caregiverName: '',
  description: '',
  isCaregiverDomain: false,
  title: '',
}

export default DomainPanelSummary
