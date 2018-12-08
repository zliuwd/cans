import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class AddCansLink extends Component {
  isDisabled = () => {
    const { disabled } = this.props
    return disabled === 'true' || disabled === true
  }

  renderLinkText() {
    return <span className={'add-cans-span'}>add cans</span>
  }

  render() {
    const { clientIdentifier } = this.props
    return this.isDisabled() ? (
      this.renderLinkText()
    ) : (
      <Link className={'add-cans-link'} to={`/clients/${clientIdentifier}/assessments`}>
        {this.renderLinkText()}
      </Link>
    )
  }
}

AddCansLink.propTypes = {
  clientIdentifier: PropTypes.string.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

AddCansLink.defaultProps = {
  disabled: false,
}

export default AddCansLink
