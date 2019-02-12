import React from 'react'
import AssessmentChangelogPage from './AssessmentChangelogPage'
import { navigation } from '../../util/constants'

const SearchAssessmentChangelogPage = props => (
  <AssessmentChangelogPage {...props} navigateTo={navigation.SEARCH_CHANGELOG} />
)

export default SearchAssessmentChangelogPage
