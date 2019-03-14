import React from 'react'
import PropTypes from 'prop-types'
import ContextualBreadCrumb from '../Layout/BreadCrumb/ContextualBreadCrumb'
import { AssessmentContainer } from '../Assessment'
import FullWidthLayout from '../Layout/FullWidthLayout'
import UserFeaturesContext from '../../util/UserFeaturesContext'

class AssessmentPageInner extends React.Component {
  constructor() {
    super()
    this.state = {
      pageTitle: null,
      leftButton: null,
      rightButton: null,
    }
  }

  updateHeaderTitle = title => this.setState({ pageTitle: title })

  updateHeaderButtons = (leftButton, rightButton) => this.setState({ leftButton, rightButton })

  updateHeaderButtonsToDefault() {}

  render() {
    const { client, history, match, navigateTo, staffInfo } = this.props
    const { pageTitle, leftButton, rightButton } = this.state

    const breadcrumb = <ContextualBreadCrumb navigateTo={navigateTo} client={client} subordinate={staffInfo} />

    const pageHeaderController = {
      updateHeaderButtons: this.updateHeaderButtons,
      updateHeaderButtonsToDefault: this.updateHeaderButtonsToDefault,
      updateHeaderTitle: this.updateHeaderTitle,
    }

    return (
      <FullWidthLayout breadcrumb={breadcrumb} pageTitle={pageTitle} leftButton={leftButton} rightButton={rightButton}>
        {client && (
          <UserFeaturesContext.Consumer>
            {userFeatures => (
              <AssessmentContainer
                client={client}
                history={history}
                match={match}
                pageHeaderController={pageHeaderController}
                userFeatures={userFeatures}
              />
            )}
          </UserFeaturesContext.Consumer>
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
