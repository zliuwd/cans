import React from 'react'
import CurrentUserLoadingBoundary from '../../common/CurrentUserLoadingBoundary'
import BreadCrumbsBuilder from './BreadCrumbsBuilder'

const ContextualBreadCrumb = props => (
  <CurrentUserLoadingBoundary>
    <BreadCrumbsBuilder {...props} />
  </CurrentUserLoadingBoundary>
)

export default ContextualBreadCrumb
