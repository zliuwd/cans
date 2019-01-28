import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class AssessmentActionsMenuItemChangeLog extends React.Component {
  state = {
    shouldRedirect: false,
  }

  changeLogSelect = () => {
    this.setState({ shouldRedirect: true })
  }

  render() {
    const { shouldRedirect } = this.state

    if (shouldRedirect) {
      const { assessmentId, inheritUrl, clientId, assessmentStatus } = this.props
      const pathname = `${inheritUrl}/clients/${clientId}/assessments/${assessmentId}/changelog/${assessmentStatus}`
      const redirectProps = { pathname }

      return <Redirect push to={redirectProps} />
    }

    return (
      <button className={'view-change-log-button'} onClick={this.changeLogSelect} role={'menuitem'}>
        View CANS Change Log
      </button>
    )
  }
}

AssessmentActionsMenuItemChangeLog.propTypes = {
  assessmentId: PropTypes.number.isRequired,
  assessmentStatus: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  inheritUrl: PropTypes.string.isRequired,
}

export default AssessmentActionsMenuItemChangeLog
