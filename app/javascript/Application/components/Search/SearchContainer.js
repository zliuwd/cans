import React from 'react'
import PropTypes from 'prop-types'
import PersonSearchForm from './PersonSearchForm'
import SearchAssessmentHistoryLoadingBoundary from './AssessmentHistory/SearchAssessmentHistoryLoadingBoundary'
import SearchAssessmentHistory from './AssessmentHistory/SearchAssessmentHistory'
import NavFromProducer from '../../util/NavFromProducer'
import { globalAlertService } from '../../util/GlobalAlertService'
import { INFO_GLOBAL_ALERT_ID } from '../Assessment/AssessmentHelper'
import './style.sass'

const SEARCH_TITLE = 'Search Clients Only'
const SEARCH_PROMPT = 'Search CWS-CMS for clients only'
const ASSESSMENTS_TITLE = 'Recently Updated CANS (In-progress only)'

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingBoundaryKey: Math.random(),
    }
  }

  componentDidMount() {
    globalAlertService.postInfo({
      message: 'To Start a CANS Assessment, Search and Select the Child',
      isAutoCloseable: false,
      componentId: INFO_GLOBAL_ALERT_ID,
    })
  }

  updateSearchAssessmentHistory = () => {
    this.setState({ loadingBoundaryKey: Math.random() })
  }

  render() {
    const { loadingBoundaryKey } = this.state
    return (
      <div>
        <PersonSearchForm searchTitle={SEARCH_TITLE} searchPrompt={SEARCH_PROMPT} />
        <h4 className="client-assessments-title">{ASSESSMENTS_TITLE}</h4>
        <SearchAssessmentHistoryLoadingBoundary key={loadingBoundaryKey}>
          <SearchAssessmentHistory
            navFrom={NavFromProducer(this.props.navigateTo)}
            inheritUrl={this.props.match.url}
            updateAssessmentHistoryCallback={this.updateSearchAssessmentHistory}
          />
        </SearchAssessmentHistoryLoadingBoundary>
      </div>
    )
  }
}

SearchContainer.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.string.isRequired,
}

export default SearchContainer
