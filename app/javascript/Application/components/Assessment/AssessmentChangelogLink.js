import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { UNSAVED_ASSESSMENT_VALIDATION_EVENT, CHANGE_LOG_EVENT } from '../../util/constants'
import { Button } from '@cwds/components'
import { eventBus } from '../../util/eventBus'

class AssessmentChangelogLink extends React.Component {
  state = {
    shouldRedirect: false,
  }

  componentDidMount() {
    eventBus.subscribe(CHANGE_LOG_EVENT, this.canRedirectAssessment)
  }

  componentWillUnmount() {
    eventBus.unsubscribe(CHANGE_LOG_EVENT, this.canRedirectAssessment)
  }

  canRedirectAssessment = () => {
    this.setState({ shouldRedirect: true })
  }

  onClick = event => {
    event.preventDefault()
    eventBus.post(UNSAVED_ASSESSMENT_VALIDATION_EVENT, CHANGE_LOG_EVENT)
  }

  render() {
    const { shouldRedirect } = this.state

    if (shouldRedirect) {
      const { assessmentId, assessmentStatus } = this.props
      const pathname = `${assessmentId}/changelog/${assessmentStatus}`
      const redirectProps = { pathname }

      return <Redirect push to={redirectProps} />
    }
    return (
      <Button
        className={'view-changelog-link button-fix-secondary'}
        color="link"
        onClick={this.onClick}
        onKeyPress={this.onClick}
      >
        <strong>view change log</strong>
      </Button>
    )
  }
}

AssessmentChangelogLink.propTypes = {
  assessmentId: PropTypes.number,
  assessmentStatus: PropTypes.string,
}
AssessmentChangelogLink.defaultProps = {
  assessmentId: undefined,
  assessmentStatus: 'IN_PROGRESS',
}

export default AssessmentChangelogLink
