import React from 'react'
import PropTypes from 'prop-types'
import AssessmentPage from './AssessmentPage'
import { navigation } from '../../util/constants'

const SearchAssessmentPage = props => {
  const navigateTo = props.match.params.id ? navigation.SEARCH_ASSESSMENT_EDIT : navigation.SEARCH_ASSESSMENT_ADD
  return <AssessmentPage {...props} navigateTo={navigateTo} />
}

SearchAssessmentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
}
export default SearchAssessmentPage
