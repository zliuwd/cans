import React from 'react'
import PropTypes from 'prop-types'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { ChangeLogPage } from '../Assessment'
import FullWidthLayout from '../Layout/FullWidthLayout'

class AssessmentChangelogPageInner extends React.Component {
  constructor() {
    super()
    this.state = {
      leftButton: null,
      rightButton: null,
    }
  }

  updateHeaderButtons = (leftButton, rightButton) => this.setState({ leftButton, rightButton })

  updateHeaderButtonsToDefault() {}

  render() {
    const { client, match, navigateTo, staffInfo } = this.props
    const { leftButton, rightButton } = this.state

    const pageHeaderButtonsController = {
      updateHeaderButtons: this.updateHeaderButtons,
      updateHeaderButtonsToDefault: this.updateHeaderButtonsToDefault,
    }

    return (
      <FullWidthLayout
        breadcrumb={
          client && (
            <ContextualBreadCrumb
              assessmentId={match.params.id}
              navigateTo={navigateTo}
              client={client}
              subordinate={staffInfo}
              url={match.url}
            />
          )
        }
        leftButton={leftButton}
        rightButton={rightButton}
      >
        {client && (
          <ChangeLogPage match={match} client={client} pageHeaderButtonsController={pageHeaderButtonsController} />
        )}
      </FullWidthLayout>
    )
  }
}

AssessmentChangelogPageInner.propTypes = {
  client: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      staffId: PropTypes.string,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.any.isRequired,
  staffInfo: PropTypes.object,
}

AssessmentChangelogPageInner.defaultProps = {
  client: null,
  staffInfo: null,
}

export default AssessmentChangelogPageInner
