import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import { Input, Label } from 'reactstrap'
import { DomainProgressBar, DomainScore, DomainItemList, DomainCaregiverControls } from './'
import DomainComment from './DomainComment'
import DomainCommentIcon from './DomainCommentIcon'
import { shouldDomainBeRendered } from './AssessmentHelper'
import { isA11yAllowedInput } from '../../util/events'
import Grid from '@material-ui/core/Grid'
import { totalScoreCalculation, itemFilter } from './DomainScoreHelper.js'
import { isEmpty } from '../../util/common'
import { expandingThenScroll } from '../../util/assessmentAutoScroll'
import { Button, Icon, UncontrolledInfotip, PopoverBody } from '@cwds/components'
import './style.sass'

const mapI18nToState = props => {
  const code = props.domain.code
  return {
    title: props.i18nAll[`${code}._title_`] || '',
    description: props.i18nAll[`${code}._description_`] || 'No Description',
    caregiverName: props.domain.caregiver_name || '',
  }
}

class Domain extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEmpty(nextProps.i18nAll) && !prevState.description) {
      return mapI18nToState(nextProps)
    }
    return null
  }

  handleOpenToReview = event => {
    if (this.props.domain.is_reviewed || !this.props.isUsingPriorRatings) {
      return
    }
    const code = this.props.domain.code
    const caregiverIndex = this.props.domain.caregiver_index
    this.props.onDomainReviewed(code, caregiverIndex)
  }

  handleExpandedChange = event => {
    this.handleOpenToReview(event)
    this.props.onExpandedChange(this.props.index, !this.props.isExpanded)
    expandingThenScroll(event, this.state.expanded, this.props.domain.items.length, this.props.disabled)
  }

  handleAddCaregiverDomain = event => {
    if (isA11yAllowedInput(event)) {
      this.props.onAddCaregiverDomain(this.props.domain.caregiver_index)
    }
  }

  handleRemoveCaregiverDomain = event => {
    if (isA11yAllowedInput(event)) {
      this.props.handleWarningShow(true, this.props.domain.caregiver_index)
    }
  }

  handleInternalCaregiverNameUpdate = event => {
    this.setState({ caregiverName: event.target.value })
  }

  handleCaregiverNameUpdate = () => {
    this.props.onCaregiverNameUpdate(this.props.domain.caregiver_index, this.state.caregiverName)
  }

  renderCaregiverName = () => {
    return (
      <div className={'caregiver-name-wrapper'}>
        <Label for={'caregiverName'} className={'caregiver-name-label'}>
          Caregiver Name <span className={'caregiver-name-label-asterisk'}>*</span>
        </Label>
        <Input
          id="caregiverName"
          bsSize="sm"
          placeholder="ex. Last Name, First Name/Relationship to child or youth"
          className={'caregiver-name'}
          value={this.state.caregiverName}
          maxLength={50}
          onChange={this.handleInternalCaregiverNameUpdate}
          onBlur={this.handleCaregiverNameUpdate}
          disabled={this.props.disabled}
        />
      </div>
    )
  }

  render = () => {
    const i18nAll = this.props.i18nAll || {}
    const {
      isAssessmentUnderSix,
      isCompletedAssessment,
      isExpanded,
      domain,
      onRatingUpdate,
      onItemCommentUpdate,
      onConfidentialityUpdate,
      canReleaseConfidentialInfo,
      index,
      disabled,
      isUsingPriorRatings,
      previousRatingsMap,
    } = this.props
    const isReviewed = isUsingPriorRatings ? domain.is_reviewed : true
    const { items, is_caregiver_domain: isCaregiverDomain } = domain
    const { title, description, caregiverName } = this.state
    const itemListProps = {
      items,
      caregiverIndex: domain.caregiver_index,
      i18nAll,
      onRatingUpdate,
      onItemCommentUpdate,
      onConfidentialityUpdate,
      isAssessmentUnderSix,
      isCompletedAssessment,
      canReleaseConfidentialInfo,
      disabled,
      previousRatingsMap,
    }
    const validItems = itemFilter(items, isAssessmentUnderSix)
    const totalScore = totalScoreCalculation(validItems)
    const warningText = <span className={'caregiver-warning-text'}> Caregiver Name is required</span>
    const ROTATION_RIGHT = 270

    return title && shouldDomainBeRendered(isAssessmentUnderSix, domain) ? (
      <ExpansionPanel expanded={isExpanded} onChange={this.handleExpandedChange} elevation={0}>
        <ExpansionPanelSummary
          expandIcon={
            isReviewed || isExpanded ? null : (
              <Button id={`domain${index}-review`} onClick={this.handleOpenToReview}>
                Open to review
              </Button>
            )
          }
        >
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            spacing={0}
            style={{ padding: 0, flexWrap: 'nowrap', flexDirection: 'row' }}
          >
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
                {description ? (
                  <UncontrolledInfotip id={`domain-${index}`} placement="top">
                    <PopoverBody>{description}</PopoverBody>
                  </UncontrolledInfotip>
                ) : null}{' '}
                {(isCaregiverDomain && caregiverName === '') ||
                (isCaregiverDomain && caregiverName && caregiverName.trim() === '')
                  ? warningText
                  : caregiverName && `- ${caregiverName}`}
              </Typography>
            </Grid>
            <Grid item xs={4} className={isReviewed ? 'domain-metric' : 'domain-metric-with-review'}>
              <div className="domain-toolbar-comment-icon-block">
                <DomainCommentIcon domain={domain} />
              </div>
              <DomainProgressBar isAssessmentUnderSix={isAssessmentUnderSix} domain={domain} />
              <DomainScore totalScore={totalScore} key={index} />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        {isExpanded && (
          <ExpansionPanelDetails
            style={{
              display: 'block',
              padding: '0',
              backgroundColor: 'white',
            }}
          >
            {isCaregiverDomain && this.renderCaregiverName()}
            <DomainItemList {...itemListProps} />
            <DomainComment
              id={`${domain.code}-${domain.caregiver_index}`}
              title={title}
              domain={domain}
              onDomainCommentUpdate={this.props.onDomainCommentUpdate}
              disabled={this.props.disabled}
              domainBottomCollapseClick={this.handleExpandedChange}
            />
            {isCaregiverDomain &&
              !this.props.disabled && (
                <DomainCaregiverControls
                  onRemoveCaregiverDomain={this.handleRemoveCaregiverDomain}
                  onAddCaregiverDomain={this.handleAddCaregiverDomain}
                />
              )}
          </ExpansionPanelDetails>
        )}
      </ExpansionPanel>
    ) : null
  }
}

Domain.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  domain: PropTypes.object.isRequired,
  handleWarningShow: PropTypes.func,
  i18nAll: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isAssessmentUnderSix: PropTypes.bool,
  isCompletedAssessment: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool,
  isUsingPriorRatings: PropTypes.bool,
  onAddCaregiverDomain: PropTypes.func.isRequired,
  onCaregiverNameUpdate: PropTypes.func.isRequired,
  onConfidentialityUpdate: PropTypes.func.isRequired,
  onDomainCommentUpdate: PropTypes.func.isRequired,
  onDomainReviewed: PropTypes.func,
  onExpandedChange: PropTypes.func.isRequired,
  onItemCommentUpdate: PropTypes.func.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
  previousRatingsMap: PropTypes.object,
}

Domain.defaultProps = {
  disabled: false,
  handleWarningShow: () => {},
  isAssessmentUnderSix: null,
  isExpanded: false,
  isUsingPriorRatings: false,
  onDomainReviewed: () => {},
  previousRatingsMap: undefined,
}

export default Domain
