import React from 'react'
import SearchAssessmentHistory from './SearchAssessmentHistory'
import './style.sass'

const NUM_ASSESSMENTS = 3

const SearchContainer = () => (
  <div className="client-search-container">
    <SearchAssessmentHistory numAssessments={NUM_ASSESSMENTS} />
  </div>
)

export default SearchContainer
