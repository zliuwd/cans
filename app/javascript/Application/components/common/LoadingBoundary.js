import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../util/loadingHelper'

class LoadingBoundary extends React.PureComponent {
  constructor(props) {
    super()
    this.state = {
      data: null,
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.fetch !== state.fetch) {
      return {
        fetch: props.fetch,
        loadingState: state.fetch === undefined ? LoadingState.waiting : LoadingState.updating,
      }
    }
    return null
  }

  async componentDidMount() {
    await this.fetch()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.fetch !== this.props.fetch) {
      await this.refetch()
    }
  }

  fetch = async () => {
    const { fetch } = this.props
    try {
      const data = await fetch()
      if (fetch !== this.props.fetch) {
        return
      }
      this.setState({
        loadingState: LoadingState.ready,
        data,
      })
    } catch (e) {
      this.setState({ loadingState: LoadingState.error })
    }
  }

  refetch = async () => {
    await this.fetch()
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
