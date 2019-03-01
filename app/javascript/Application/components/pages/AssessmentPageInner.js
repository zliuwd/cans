import React from 'react'
import PropTypes from 'prop-types'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { AssessmentForm } from '../Assessment'
import FullWidthLayout from '../Layout/FullWidthLayout'

class AssessmentPageInner extends React.Component {
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
    const { client, history, match, navigateTo, staffInfo } = this.props
    const { leftButton, rightButton } = this.state

    const breadcrumb = <ContextualBreadCrumb navigateTo={navigateTo} client={client} subordinate={staffInfo} />

    const pageHeaderButtonsController = {
      updateHeaderButtons: this.updateHeaderButtons,
      updateHeaderButtonsToDefault: this.updateHeaderButtonsToDefault,
    }

    return (
      <FullWidthLayout
        breadcrumb={breadcrumb}
        leftButton={leftButton}
        rightButton={rightButton}
        navigateTo={navigateTo}
      >
        {client && (
          <AssessmentForm
            client={client}
            history={history}
            match={match}
            pageHeaderButtonsController={pageHeaderButtonsController}
          />
        )}
      </FullWidthLayout>
    )
  }
}

AssessmentPageInner.propTypes = {
  client: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.string.isRequired,
  staffInfo: PropTypes.object,
}

AssessmentPageInner.defaultProps = {
  client: null,
  staffInfo: null,
}

export default AssessmentPageInner
