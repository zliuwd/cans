import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { clone } from '../../util/common'
import { AssessmentStatus, shouldDomainBeRendered } from './AssessmentHelper'
import { updateItem } from './AssessmentMutations'
import { containsNotReviewedDomains } from './ReassessmentHelper'
import AssessmentCard from './AssessmentCard'
import DomainExpansionController from './DomainExpansionController'

class Assessment extends Component {
  componentDidUpdate(prevProps) {
    const hasCaregiver = this.props.assessment.has_caregiver
    const hasCaregiverChange = hasCaregiver !== prevProps.assessment.has_caregiver
    if (hasCaregiverChange && !hasCaregiver) {
      this.removeAllCaregiverDomains()
    } else if (hasCaregiverChange && hasCaregiver) {
      this.addInitialCaregiverDomain()
    }
  }

  handleUpdateItemRating = (code, rating, caregiverIndex) => {
    this.updateItem(code, 'rating', rating, caregiverIndex)
  }

  handleUpdateItemComment = (code, comment, caregiverIndex) => {
    this.updateItem(code, 'comment', comment, caregiverIndex)
  }

  handleUpdateItemConfidentiality = (code, isConfidential, caregiverIndex) => {
    this.updateItem(code, 'confidential', isConfidential, caregiverIndex)
  }

  updateItem = (itemCode, key, value, itemCaregiverIndex) => {
    const newAssessment = updateItem(this.props.assessment, itemCode, key, value, itemCaregiverIndex)
    this.props.onAssessmentUpdate(newAssessment)
  }

  addCaregiverDomainAfter = caregiverIndex => {
    const assessment = clone(this.props.assessment)
    const domains = assessment.state.domains
    const idArray = domains.map(el => {
      return el.id
    })
    idArray.sort((a, b) => {
      return b - a
    })
    for (const [index, domain] of domains.entries()) {
      if (domain.caregiver_index === caregiverIndex) {
        const template = clone(assessment.state.caregiver_domain_template)
        template.id = idArray[0] + 1
        domains.splice(index + 1, 0, template)
        break
      }
    }
    this.props.onAssessmentUpdate(assessment)
  }

  addInitialCaregiverDomain() {
    const assessment = clone(this.props.assessment)
    const domains = assessment.state.domains
    domains.splice(domains.length - 1, 0, clone(assessment.state.caregiver_domain_template))
    this.props.onAssessmentUpdate(assessment)
  }

  removeCaregiverDomain = caregiverIndex => {
    const assessment = clone(this.props.assessment)
    const domains = assessment.state.domains
    for (const [index, domain] of domains.entries()) {
      if (domain.caregiver_index === caregiverIndex) {
        domains.splice(index, 1)
        break
      }
    }
    if (!domains.filter(domain => domain.is_caregiver_domain).length) {
      assessment.has_caregiver = false
    }
    this.props.onAssessmentUpdate(assessment)
  }

  removeAllCaregiverDomains() {
    const assessment = clone(this.props.assessment)
    const domains = assessment.state.domains
    const caregiverDomains = domains.filter(domain => domain.is_caregiver_domain)
    for (const caregiverDomain of caregiverDomains) {
      domains.splice(domains.findIndex(domain => domain.id === caregiverDomain.id), 1)
    }
    this.props.onAssessmentUpdate(assessment)
  }

  updateCaregiverName = (caregiverIndex, caregiverName) => {
    const assessment = clone(this.props.assessment)
    for (const domain of assessment.state.domains) {
      if (domain.caregiver_index === caregiverIndex) {
        domain.caregiver_name = caregiverName
        break
      }
    }
    this.props.onAssessmentUpdate(assessment)
  }

  updateDomainComment = (code, comment, caregiverIndex) => {
    const assessment = clone(this.props.assessment)
    assessment.state.domains.map(domain => {
      if (domain.caregiver_index === caregiverIndex && domain.code === code) {
        domain.comment = comment
      }
    })
    this.props.onAssessmentUpdate(assessment)
  }

  updateDomainIsReviewed = (code, caregiverIndex) => {
    const assessment = clone(this.props.assessment)
    assessment.state.domains.map(domain => {
      if (domain.caregiver_index === caregiverIndex && domain.code === code) {
        domain.is_reviewed = true
      }
    })
    this.props.onAssessmentUpdate(assessment)
  }

  render() {
    const { assessment, disabled, i18n, footer, previousRatingsMap } = this.props
    const { under_six: isUnderSix, domains } = assessment.state
    const isDomainsReviewed = !assessment.preceding_assessment_id || !containsNotReviewedDomains(domains, isUnderSix)
    const isCompletedAssessment = AssessmentStatus.completed === assessment.status

    const renderedDomains = domains.filter(domain => shouldDomainBeRendered(isUnderSix, domain))

    const actions = {
      onRatingUpdate: this.handleUpdateItemRating,
      onItemCommentUpdate: this.handleUpdateItemComment,
      onConfidentialityUpdate: this.handleUpdateItemConfidentiality,
      onAddCaregiverDomain: this.addCaregiverDomainAfter,
      onRemoveCaregiverDomain: this.removeCaregiverDomain,
      onCaregiverNameUpdate: this.updateCaregiverName,
      onDomainCommentUpdate: this.updateDomainComment,
      onDomainReviewed: this.updateDomainIsReviewed,
      handleWarningShow: this.props.handleWarningShow,
    }

    return !(isUnderSix === null || isUnderSix === undefined) ? (
      <DomainExpansionController domains={renderedDomains}>
        <AssessmentCard
          actions={actions}
          canReleaseConfidentialInfo={Boolean(assessment.can_release_confidential_info)}
          disabled={disabled}
          footer={footer}
          i18n={i18n}
          isCompletedAssessment={isCompletedAssessment}
          isDomainsReviewed={isDomainsReviewed}
          isUnderSix={isUnderSix}
          isUsingPriorRatings={Boolean(assessment.preceding_assessment_id)}
          previousRatingsMap={previousRatingsMap}
        />
      </DomainExpansionController>
    ) : null
  }
}

Assessment.propTypes = {
  assessment: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  footer: PropTypes.node.isRequired,
  handleWarningShow: PropTypes.func,
  i18n: PropTypes.object.isRequired,
  onAssessmentUpdate: PropTypes.func.isRequired,
  previousRatingsMap: PropTypes.object,
}

Assessment.defaultProps = {
  disabled: false,
  handleWarningShow: () => {},
  previousRatingsMap: undefined,
}

export default Assessment
