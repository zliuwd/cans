import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { DomainProgressBar, DomainScore } from './'
import DomainCommentIcon from './DomainCommentIcon'
import Grid from '@material-ui/core/Grid'
import { Icon, UncontrolledInfotip, PopoverBody } from '@cwds/components'

class DomainPanelSummary extends React.PureComponent {
  renderCaregiverName() {
    const { caregiverName, isCaregiverDomain, warningText } = this.props

    return (isCaregiverDomain && caregiverName === '') ||
      (isCaregiverDomain && caregiverName && caregiverName.trim() === '')
      ? warningText
      : caregiverName && `- ${caregiverName}`
  }

  renderInfoTip() {
    const { description, index } = this.props

    return description ? (
      <UncontrolledInfotip id={`domain-${index}`} placement="top">
        <PopoverBody>{description}</PopoverBody>
      </UncontrolledInfotip>
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
  isReviewed: PropTypes.bool,
  title: PropTypes.string,
  totalScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  warningText: PropTypes.node.isRequired,
}

DomainPanelSummary.defaultProps = {
  caregiverName: '',
  description: '',
  isCaregiverDomain: false,
  isReviewed: true,
  title: '',
}

export default DomainPanelSummary
