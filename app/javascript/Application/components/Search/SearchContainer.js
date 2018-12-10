import React from 'react'
import PersonSearchForm from './PersonSearchForm'
import SearchAssessmentHistory from './SearchAssessmentHistory'
import './style.sass'

const SEARCH_TITLE = 'Search Clients Only'
const SEARCH_PROMPT = 'Search CWS-CMS for clients only'
const ASSESSMENTS_TITLE = 'Recently Updated CANS'
const NUM_ASSESSMENTS = 3

const SearchContainer = () => (
  <div className="client-search-container">
    <PersonSearchForm searchTitle={SEARCH_TITLE} searchPrompt={SEARCH_PROMPT} />
    <h4 className="client-assessments-title">{ASSESSMENTS_TITLE}</h4>
    <SearchAssessmentHistory numAssessments={NUM_ASSESSMENTS} />
  </div>
)

export default SearchContainer
