import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../util/loadingHelper'

class LoadingBoundary extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      loadingState: LoadingState.waiting,
      data: null,
    }
  }

  async componentDidMount() {
    await this.fetch()
  }

  fetch = async () => {
    const { fetch } = this.props
    try {
      const data = await fetch()
      this.setState({
        loadingState: LoadingState.ready,
        data,
      })
    } catch (e) {
      this.setState({ loadingState: LoadingState.error })
    }
  }

  render() {
    const { children, childNodeFetchedPropName, isHiddenWhileLoading } = this.props
    const { loadingState, data } = this.state
    return isHiddenWhileLoading && LoadingState.waiting === loadingState
      ? null
      : React.cloneElement(children, {
          [childNodeFetchedPropName]: data,
          loadingState,
        })
  }
}

LoadingBoundary.propTypes = {
  childNodeFetchedPropName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fetch: PropTypes.func.isRequired,
  isHiddenWhileLoading: PropTypes.bool,
}

LoadingBoundary.defaultProps = {
  isHiddenWhileLoading: true,
}

export default LoadingBoundary
