import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getI18nByCode } from '../common/I18nHelper'
import PrintSummary from './PrintSummary'
import EprintLayout from './enhancedPrint/EprintLayout'
import CategoryHeader from './enhancedPrint/CategoryHeader'
import EprintPageBreaker from './enhancedPrint/EprintPageBreaker'
import Logo from './Logo.jpeg'
import {
  alertSignBox,
  headerBlock,
  headerNameRow,
  headerRecord,
  headerRow,
  itemStyle,
  itemMainLine,
  itemComment,
  domainScoreStyle,
  itemTitleWrapper,
  itemTitle,
  optionStyle,
  optionRadioStyle,
  optionLabelStyle,
  domainTitleStyle,
  domainHeaderStyle,
  domainComment,
  flex,
  redactedRating,
  textAlignCenter,
  timeStampStyle,
  thinGrayBorder,
} from './PrintAssessmentStyle'
import { formatClientName, clientCaseReferralNumber } from '../Client/Client.helper'
import { isoToLocalDate } from '../../util/dateHelper'
import { shouldDomainBeRendered, shouldItemBeRendered } from '../Assessment/AssessmentHelper'
import { totalScoreCalculation } from '../Assessment/DomainScoreHelper.js'
import {
  isStrengthsDomain,
  isNeedsDomain,
  isTraumaDomain,
  itemsValue,
} from '../Assessment/AssessmentSummary/DomainHelper'
import moment from 'moment'

const isConfidential = item => item.confidential_by_default && item.confidential
const isDiscretionNeeded = item => !item.confidential_by_default && item.confidential
const isItemHidden = item => isConfidential(item) || isDiscretionNeeded(item)

const hasConfidentialItems = domain => domain.items.filter(isConfidential).length > 0
const hasDiscretionNeededItems = domain => domain.items.filter(isDiscretionNeeded).length > 0

class PrintAssessment extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isAssessmentUnderSix: Boolean(this.props.assessment.state.under_six),
    }
  }

  renderOptions = (item, isRegularType) => {
    const optionCodes = {
      notApplicable: 8,
      value0orNo: 0,
      value1orYes: 1,
      value2: 2,
      value3: 3,
    }
    return (
      <div style={flex}>
        <div style={itemTitleWrapper}>
          <div style={optionLabelStyle}>Rating:</div>
        </div>
        <div style={flex}>
          {item.has_na_option && this.renderOption(item.rating === optionCodes.notApplicable, 'N/A')}
          {this.renderOption(item.rating === optionCodes.value0orNo, isRegularType ? '0' : 'No')}
          {this.renderOption(item.rating === optionCodes.value1orYes, isRegularType ? '1' : 'Yes')}
          {isRegularType && this.renderOption(item.rating === optionCodes.value2, '2')}
          {isRegularType && this.renderOption(item.rating === optionCodes.value3, '3')}
        </div>
      </div>
    )
  }

  renderOption = (isChecked, label) => (
    <div style={optionStyle}>
      <input style={optionRadioStyle} type="radio" checked={isChecked} readOnly />
      <span style={optionLabelStyle}>{label}</span>
    </div>
  )

  stripeGenerator = index => {
    return index & 1 ? 'stripe-gray' : null
  }

  renderItem = (item, index, caregiverIndex, itemI18n) => {
    const title = itemI18n._title_ || ''
    const itemNumber = this.state.isAssessmentUnderSix ? item.under_six_id : item.above_six_id
    const isRegularType = item.rating_type === 'REGULAR'
    return (
      <div key={caregiverIndex + itemNumber} style={itemStyle}>
        <div className={`item-main-line ${this.stripeGenerator(index)}`}>
          <div style={itemTitleWrapper}>
            <div style={itemTitle}>
              {itemNumber}
              {caregiverIndex}. {title}
            </div>
          </div>
          <div style={flex}>
            <div style={itemTitleWrapper}>
              <div style={optionLabelStyle}>{item.confidential_by_default ? 'Confidential' : 'Discretion Needed'} </div>
            </div>
            <div style={itemTitleWrapper}>
              <input type={'checkbox'} checked={item.confidential} readOnly />
            </div>
          </div>
          {!isItemHidden(item) ? this.renderOptions(item, isRegularType) : <div style={redactedRating} />}
        </div>
        {item.comment && !isItemHidden(item) ? <div style={itemComment}>Comment: {item.comment}</div> : null}
      </div>
    )
  }

  renderDomain = (domain, domainI18n) => {
    const { code, caregiver_index: caregiverIndex, items, comment } = domain
    const title = (domainI18n._title_ || '').toUpperCase()
    const caregiverName = domain.caregiver_name || ''
    const totalScore = hasConfidentialItems(domain)
      ? 'Confidential'
      : hasDiscretionNeededItems(domain)
        ? 'Discretion Needed'
        : totalScoreCalculation(items)
    return (
      <div key={code + caregiverIndex}>
        <div className="domain-header">
          <div style={domainTitleStyle}>
            <span>
              <strong>
                {title} {caregiverName && `- ${caregiverName}`}
              </strong>
            </span>
            <span>
              Domain Total Score: <strong style={domainScoreStyle}>{totalScore}</strong>
            </span>
          </div>
          {comment && !hasConfidentialItems(domain) && <div style={domainComment}>Domain Comment: {comment}</div>}
        </div>
        <div>
          {items.map((item, index) => {
            const { isAssessmentUnderSix } = this.state
            if (!shouldItemBeRendered(isAssessmentUnderSix, item)) return null
            const itemI18n = getI18nByCode(this.props.i18n, item.code)
            return this.renderItem(item, index, caregiverIndex, itemI18n)
          })}
        </div>
      </div>
    )
  }

  renderConfidentialWarningAlert = () => {
    return (
      <div style={alertSignBox}>
        <strong>
          By selecting NO, Items {this.props.substanceUseItemsIds.aboveSix[0]}, 48, and EC 41 (Substance Use Disorder
          Items) from this CANS assessment will be redacted when printed.
        </strong>
      </div>
    )
  }

  renderHeaderRecord = (title, value) => (
    <div style={headerRecord}>
      <strong>{title}</strong>
      <span>{value}</span>
    </div>
  )

  renderSummaryRecord = (title, value) => (
    <div style={headerRecord}>
      <strong>{title}</strong> <br /> {value && value.map(val => <div key={val}>{val}</div>)}
    </div>
  )

  renderHeaderRadioGroupRecord = (title, value, optionTrueCaption, optionFalseCaption) => (
    <div style={headerRecord}>
      <strong>{title}</strong>
      <div>
        <input style={optionRadioStyle} type="radio" checked={value} readOnly />
        {optionTrueCaption || 'Yes'}
        <input style={optionRadioStyle} type="radio" checked={!value} readOnly />
        {optionFalseCaption || 'No'}
      </div>
    </div>
  )

  renderHeadLine = () => {
    return (
      <div className="head-line-container">
        <div className="logo-container">
          <img className="logo" src={Logo} alt="Logo" />
        </div>
        <div className="head-title">CARES - CANS Reassessment</div>
        <div className="head-age-range">6 - 21 years old</div>
      </div>
    )
  }

  renderHeader() {
    const assessment = this.props.assessment
    const clientName = formatClientName(assessment.person)
    const countyName = assessment.county && assessment.county.name ? `${assessment.county.name} County` : ''
    const eventDate = isoToLocalDate(assessment.event_date)
    const conductedBy = assessment.conducted_by || ''
    const caseReferralNumber = clientCaseReferralNumber(assessment.service_source)
    const hasCaregiver = assessment.has_caregiver
    const canReleaseInfo = assessment.can_release_confidential_info
    const isUnderSix = this.props.assessment.state.under_six
    return (
      <div className="header-container">
        <div className="header-first">
          <div className="header-first-box">
            <div>{eventDate}</div>
            <hr />
            <div>Date of Assessment</div>
            <div>mm/dd/yy</div>
          </div>
          <div className="header-first-box">
            <div>{caseReferralNumber}</div>
            <hr />
            <div>Case / Referral Number</div>
            <div />
          </div>
          <div className="header-first-box">
            <div>{countyName}</div>
            <hr />
            <div>County</div>
            <div />
          </div>
          <div className="header-first-box">
            <div>01/01/2015</div>
            <hr />
            <div>Date of Birth</div>
            <div>mm/dd/yy</div>
          </div>
          <div className="header-first-box">
            <div>4</div>
            <hr />
            <div>Age</div>
            <div />
          </div>
        </div>
        <div className="header-second">
          <div className="header-sec-box">
            <div>{countyName}</div>
            <hr />
            <div>First name</div>
          </div>
          <div className="header-sec-box">
            <div>{countyName}</div>
            <hr />
            <div>Middle name</div>
          </div>
          <div className="header-sec-box">
            <div>{countyName}</div>
            <hr />
            <div>Last name</div>
          </div>
        </div>
        <div className="header-third">
          <div className="header-third-box">
            <div>Assessment Conducted by:</div>
            <div>Mike</div>
            <hr />
            <div>First name</div>
          </div>
          <div className="header-third-box">
            <div />
            <div>Alen</div>
            <hr />
            <div>Middle name</div>
          </div>
          <div className="header-third-box">
            <div />
            <div>Seaver</div>
            <hr />
            <div>Last name</div>
          </div>
        </div>
      </div>
    )
  }

  getCodes(domains, domainFilter, itemFilter) {
    const items = itemsValue(domains, domainFilter, itemFilter)

    const codes = items.map(item => {
      const code = getI18nByCode(this.props.i18n, item.code)
      return (code && code._title_) || ''
    })

    return codes
  }

  render() {
    const { isAssessmentUnderSix } = this.state
    const handleStatus = this.props.assessment.status
    const status = 'COMPLETED'
    const { i18n } = this.props
    const imaRating = 3
    const domains = this.props.assessment.state.domains
    const filteredDomains = domains.filter(
      domain => (this.state.isAssessmentUnderSix ? domain.under_six : domain.above_six)
    )
    const summaryCodes = {
      Strengths: this.getCodes(filteredDomains, isStrengthsDomain, item => item.rating === 0 || item.rating === 1),
      'Action Required': this.getCodes(filteredDomains, isNeedsDomain, item => item.rating === 2),
      'Immediate Action Required': this.getCodes(filteredDomains, isNeedsDomain, item => item.rating === imaRating),
      Trauma: this.getCodes(domains, isTraumaDomain, item => item.rating === 1),
    }

    const printPageHeader = (
      <div>
        <p className="h-p">CARES-CANS Reassessment | 03/01/2019</p>
        <p className="h-p">Case/Referral Number: 123456789</p>
        <p className="h-p">San Bernadino County | Age 6-21 Template</p>
      </div>
    )
    const printPageFooter = 'This assessment is confidential...disclaimer text here'
    return (
      <EprintLayout header={printPageHeader} footer={printPageFooter}>
        {this.renderHeadLine()}
        {this.renderHeader()}
        <CategoryHeader title="CANS Ratings" />
        {domains.map(domain => {
          if (!shouldDomainBeRendered(isAssessmentUnderSix, domain)) return null
          const domainI18n = getI18nByCode(i18n, domain.code)
          return this.renderDomain(domain, domainI18n)
        })}
        <EprintPageBreaker />
        {handleStatus !== status ? null : (
          <div>
            <CategoryHeader title="CANS Summary" />
            <PrintSummary renderSummaryRecord={this.renderSummaryRecord} summaryCodes={summaryCodes} />
          </div>
        )}
      </EprintLayout>
    )
  }
}

PrintAssessment.propTypes = {
  assessment: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  substanceUseItemsIds: PropTypes.shape({
    underSix: PropTypes.array.isRequired,
    aboveSix: PropTypes.array.isRequired,
  }).isRequired,
}

export default PrintAssessment
