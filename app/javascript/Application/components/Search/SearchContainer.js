import React from 'react'
import PropTypes from 'prop-types'
import PersonSearchForm from './PersonSearchForm'
import SearchAssessmentHistoryLoadingBoundary from './AssessmentHistory/SearchAssessmentHistoryLoadingBoundary'
import SearchAssessmentHistory from './AssessmentHistory/SearchAssessmentHistory'
import NavFromProducer from '../../util/NavFromProducer'
import './style.sass'
import { alertType, CloseableAlert } from '../common'
import Sticker from 'react-stickyfill'

const SEARCH_TITLE = 'Search Clients Only'
const SEARCH_PROMPT = 'Search CWS-CMS for clients only'
const ASSESSMENTS_TITLE = 'Recently Updated CANS'
const NUM_ASSESSMENTS = 3

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingBoundaryKey: Math.random(),
    }
  }

  updateSearchAssessmentHistory = () => {
    this.setState({ loadingBoundaryKey: Math.random() })
  }

  render() {
    const { loadingBoundaryKey } = this.state
    return (
      <div className="client-search-container">
        <Sticker>
          <div className="top-alert-container">
            <CloseableAlert
              id={'top-alert-box'}
              message={'To Start a CANS Assessment, Search and Select the Child'}
              type={alertType.INFO}
              isCloseable={true}
            />
          </div>
        </Sticker>
        <PersonSearchForm searchTitle={SEARCH_TITLE} searchPrompt={SEARCH_PROMPT} />
        <h4 className="client-assessments-title">{ASSESSMENTS_TITLE}</h4>
        <SearchAssessmentHistoryLoadingBoundary loadingBoundaryKey={loadingBoundaryKey} key={loadingBoundaryKey}>
          <SearchAssessmentHistory
            numAssessments={NUM_ASSESSMENTS}
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
