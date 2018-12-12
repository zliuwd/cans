import React from 'react'
import PropTypes from 'prop-types'
import SecurityService from './Security.service'
import { LoadingState } from '../../util/loadingHelper'

class AuthBoundary extends React.PureComponent {
  constructor(props) {
    super()
    this.state = {
      loadingState: LoadingState.waiting,
    }
  }

  async componentDidMount() {
    await this.authorize()
  }

  async componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.eagerRefreshFlagObject) !== JSON.stringify(this.props.eagerRefreshFlagObject)) {
      await this.authorize()
    }
  }

  authorize = async () => {
    const { permission } = this.props
    this.setState({
      loadingState: LoadingState.waiting,
    })
    try {
      await SecurityService.checkPermission(permission).then(isAuthorized => {
        this.setState({
          loadingState: LoadingState.ready,
          isAuthorized: isAuthorized,
        })
      })
    } catch (e) {
      this.setState({ loadingState: LoadingState.error })
    }
  }

  isDisabled = permission => {
    if (!this.props.andCondition) {
      return true
    }
    if (this.props.orCondition) {
      return false
    }
    return !this.state.isAuthorized
  }

  render() {
    const { children } = this.props
    const { loadingState } = this.state
    return LoadingState.waiting === loadingState ? null : React.cloneElement(children, { disabled: this.isDisabled() })
  }
}

AuthBoundary.propTypes = {
  /* eslint-disable react/boolean-prop-naming */
  andCondition: PropTypes.bool,
  children: PropTypes.node.isRequired,
  eagerRefreshFlagObject: PropTypes.object,
  orCondition: PropTypes.bool,
  permission: PropTypes.string.isRequired,
  /* eslint-enable react/boolean-prop-naming */
}

AuthBoundary.defaultProps = {
  eagerRefreshFlagObject: {},
  andCondition: true,
  orCondition: false,
}

export default AuthBoundary
