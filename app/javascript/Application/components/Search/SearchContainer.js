import React from 'react'
import PropTypes from 'prop-types'
import PersonSearchForm from './PersonSearchForm'
import SearchAssessmentHistory from './SearchAssessmentHistory'
import NavFromProducer from '../../util/NavFromProducer'
import './style.sass'

const SEARCH_TITLE = 'Search Clients Only'
const SEARCH_PROMPT = 'Search CWS-CMS for clients only'
const ASSESSMENTS_TITLE = 'Recently Updated CANS'
const NUM_ASSESSMENTS = 3

const SearchContainer = props => (
  <div className="client-search-container">
    <PersonSearchForm searchTitle={SEARCH_TITLE} searchPrompt={SEARCH_PROMPT} />
    <h4 className="client-assessments-title">{ASSESSMENTS_TITLE}</h4>
    <SearchAssessmentHistory numAssessments={NUM_ASSESSMENTS} navFrom={NavFromProducer(props.navigateTo)} />
  </div>
)

SearchContainer.propTypes = {
  navigateTo: PropTypes.string.isRequired,
}

export default SearchContainer
