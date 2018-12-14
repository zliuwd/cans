import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '@cwds/components'

class LoadableButton extends PureComponent {
  renderButton = () => {
    const { caption, className, isDisabled, isLoading } = this.props
    const loadingStyle = isLoading ? 'button-loading' : ''
    return isDisabled || isLoading ? (
      <Button className={`button-fix-primary ${loadingStyle} ${className}`} disabled={true} {...this.props}>
        {isLoading ? 'Loading...' : caption}
      </Button>
    ) : (
      <Button className={`button-fix-primary ${className}`} {...this.props}>
        {caption}
      </Button>
    )
  }

  render() {
    const { linkUrl } = this.props
    const button = this.renderButton()
    return linkUrl ? <Link to={linkUrl}>{button}</Link> : button
  }
}

LoadableButton.propTypes = {
  caption: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  linkUrl: PropTypes.string,
}

LoadableButton.defaultProps = {
  isDisabled: false,
  isLoading: false,
  linkUrl: '',
}

export default LoadableButton
